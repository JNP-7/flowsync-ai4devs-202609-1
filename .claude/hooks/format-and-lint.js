#!/usr/bin/env node
// .claude/hooks/format-and-lint.js
//
// PostToolUse hook (matcher: Edit|Write), invoked in "exec form" as
// `node format-and-lint.js` — no shell involved, so this runs identically
// on Windows, macOS and Linux. Formats/lints only the file that was just
// edited, with whichever toolchain applies:
//   - backend/*.ts  -> eslint --fix + prettier --write (what's configured there)
//   - frontend/*.ts(x) -> oxlint --fix (frontend has no Prettier installed)
//
// Best-effort only: this hook never blocks anything. The Stop hook
// (verify-before-stop.js) is what gates on real failures.
 
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
 
function run(command, cwd) {
  try {
    execSync(command, { cwd, stdio: 'inherit' })
  } catch {
    // Swallow errors: formatting/autofix is best-effort here.
  }
}
 
const raw = readStdin()
let data
try {
  data = JSON.parse(raw)
} catch {
  process.exit(0)
}
 
const filePath = data && data.tool_input && data.tool_input.file_path
if (!filePath || !fs.existsSync(filePath)) process.exit(0)
 
const projectDir = process.env.CLAUDE_PROJECT_DIR || process.cwd()
const backendDir = path.join(projectDir, 'backend')
const frontendDir = path.join(projectDir, 'frontend')
const resolved = path.resolve(filePath)
 
if (resolved.startsWith(backendDir + path.sep) && resolved.endsWith('.ts')) {
  run(`npx eslint --fix "${resolved}"`, backendDir)
  run(`npx prettier --write "${resolved}"`, backendDir)
} else if (
  resolved.startsWith(frontendDir + path.sep) &&
  (resolved.endsWith('.ts') || resolved.endsWith('.tsx'))
) {
  run(`npx oxlint --fix "${resolved}"`, frontendDir)
}
 
process.exit(0)
 