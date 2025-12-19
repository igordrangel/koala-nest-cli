import { copyFolder } from '@/utils/copy-folder'
import chalk from 'chalk'
import { execSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export function newProject(projectName: string) {
  copyFolder(path.join(__dirname, 'code-base/startup-project'), projectName)
  
  const packageJson = require(path.join(process.cwd(), projectName, 'package.json'))
  packageJson.name = projectName
  writeFileSync(path.join(process.cwd(), projectName, 'package.json'), JSON.stringify(packageJson, null, 2))

  let readme = readFileSync(path.join(path.join(process.cwd(), projectName, 'README.md'))).toString()
  readme = readme.replace('[projectName]', projectName)
  writeFileSync(path.join(process.cwd(), projectName, 'README.md'), readme)

  let env = readFileSync(path.join(path.join(__dirname, 'code-base/env', 'config.txt'))).toString()
  env = env.replace(/\[projectName\]/g, projectName.replace(/-/g, '_'))
  writeFileSync(path.join(process.cwd(), projectName, '.env'), env)

  const gitIgnore = readFileSync(path.join(path.join(__dirname, 'code-base/gitignore', 'config.txt'))).toString()
  writeFileSync(path.join(process.cwd(), projectName, '.gitignore'), gitIgnore)

  execSync(`cd ${projectName} && bun install && bun run prisma:generate`, {
    stdio: 'inherit',
  })

  console.log(`${chalk.green('Projeto criado com sucesso!')}`)
}
