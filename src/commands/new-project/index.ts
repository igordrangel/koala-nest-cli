import { copyFolder } from '@/utils/copy-folder'
import chalk from 'chalk'
import { execSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'

export function newProject(projectName: string) {
  copyFolder(path.join(__dirname, 'code-base/startup-project'), projectName)
  
  const packageJson = require(path.join(process.cwd(), projectName, 'package.json'))
  packageJson.name = projectName
  writeFileSync(path.join(process.cwd(), projectName, 'package.json'), JSON.stringify(packageJson, null, 2))

  let readme = readFileSync(path.join(path.join(process.cwd(), projectName, 'README.md'))).toString()
  readme = readme.replace('[projectName]', projectName)
  writeFileSync(path.join(process.cwd(), projectName, 'README.md'), readme)

  execSync(`cd ${projectName} && npm install && npx prisma generate`, {
    stdio: 'inherit',
  })

  console.log(`${chalk.green('Projeto criado com sucesso!')}`)
}
