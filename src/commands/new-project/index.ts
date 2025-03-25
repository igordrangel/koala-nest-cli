import { copyFolder } from '@/utils/copy-folder'
import chalk from 'chalk'
import { execSync } from 'node:child_process'
import path from 'node:path'

export function newProject(projectName: string) {
  copyFolder(path.join(__dirname, 'code-base/startup-project'), projectName)
  execSync(`cd ${projectName} && npm install && npx prisma generate`, {
    stdio: 'inherit',
  })
  console.log(`${chalk.green('Projeto criado com sucesso!')}`)
}
