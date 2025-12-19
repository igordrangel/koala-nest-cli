#!/usr/bin/env node

import program from 'commander'
import inquirer from 'inquirer'
import { newProject } from './commands/new-project'
import chalk from 'chalk'
import figlet from 'figlet'
import packageJson from '../package.json' with { type: 'json' }

program.version(packageJson.version)

console.log(chalk.cyan(figlet.textSync('Koala Nest CLI')))

program
  .command('new [projectName]')
  .description('Cria um novo projeto Nest com Koala Nest')
  .action(async (projectName: string) => {
    if (!projectName) {
      projectName = await inquirer
        .prompt([
          {
            type: 'input',
            name: 'projectName',
            message: 'Informe o nome do projeto',
            validate: (value?: string) =>
              value ? true : 'Não é permitido um nome vazio',
          },
        ])
        .then((answers) => answers.projectName)
    }

    newProject(projectName)
  })

program.parse(process.argv)
