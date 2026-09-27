#!/usr/bin/env node
// .claude/hooks/verify-before-stop.js
//
// Stop hook, invoked in "exec form" as `node verify-before-stop.js` (fires
// every time Claude finishes responding, on every OS the same way). If
// backend/ or frontend/ have uncommitted changes, runs the real checks
// (typecheck+test for backend, lint+build for frontend) and BLOCKS the
// turn from ending if any of them fail, feeding the error back to Claude
// so it keeps working instead of declaring victory on broken code.
 
const { execSync } = require('node:child_process')
const path = require('node:path')
const fs = require('node:fs')
 
function readStdin() {
  try {
    return fs.readFileSync(0, 'utf-8')
  } catch {
    return ''
  }
}
 
let data = {}
try {
  data = JSON.parse(readStdin())
} catch {
  // no-op: treat as no input
}
 
// Avoid blocking forever: if this hook already forced one continuation,
// let Claude stop this time even if something is still failing.
if (data.stop_hook_active) process.exit(0)
 
const projectDir = process.env.CLAUDE_PROJECT_DIR || process.cwd()
 
function hasChanges(subdir) {
  try {
    const out = execSync(`git status --porcelain -- ${subdir}`, {
      cwd: projectDir,
      encoding: 'utf-8',
    })
    return out.trim().length > 0
  } catch {
    return false
  }
}
 
function runChecks(cwd, commands) {
  const failures = []
  for (const cmd of commands) {
    try {
      execSync(cmd, { cwd, encoding: 'utf-8', stdio: 'pipe' })
    } catch (err) {
      const output = `${err.stdout || ''}${err.stderr || ''}`.trim()
      failures.push(`$ ${cmd}\n${output}`)
    }
  }
  return failures
}
 
const failures = []
 
if (hasChanges('backend')) {
  const backendFailures = runChecks(path.join(projectDir, 'backend'), [
    'npm run typecheck',
    'npm test',
  ])
  if (backendFailures.length) {
    failures.push(`Backend checks failed:\n${backendFailures.join('\n\n')}`)
  }
}
 
if (hasChanges('frontend')) {
  const frontendFailures = runChecks(path.join(projectDir, 'frontend'), [
    'npm run lint',
    'npm run build',
  ])
  if (frontendFailures.length) {
    failures.push(`Frontend checks failed:\n${frontendFailures.join('\n\n')}`)
  }
}
 
if (failures.length) {
  console.log(
    JSON.stringify({
      decision: 'block',
      reason: `${failures.join('\n\n')}\n\nFix the errors above before finishing.`,
    })
  )
}
 
process.exit(0)