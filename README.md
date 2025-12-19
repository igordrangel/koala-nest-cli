# @koalarx/nest-cli

Ferramenta oficial de CLI para scaffolding rápido de projetos NestJS estruturados com padrões DDD.

## 📋 Sobre

`@koalarx/nest-cli` é a forma recomendada para inicializar novos projetos que utilizam a biblioteca [@koalarx/nest](https://github.com/igordrangel/koala-nest). Cria automaticamente a estrutura de diretórios, configurações de ambiente e setup inicial.

## 📦 Instalação

```bash
bun add -g @koalarx/nest-cli
```

**Requisitos:** 
- Bun 1.0.0+ ([Instale o Bun](https://bun.sh))
- Node.js 20.18.0+ (necessário para executar os projetos criados)

## 🚀 Uso Rápido

```bash
# Criar novo projeto
koala-nest new meu-projeto

# Entrar no diretório
cd meu-projeto

# Iniciar desenvolvimento (as dependências são instaladas automaticamente com bun)
npm run start:dev
```

> **Nota:** A CLI utiliza **Bun** por debaixo dos panos para instalar os pacotes do projeto no comando `koala-nest new`. Isso torna o processo mais rápido e eficiente.

## 📖 Documentação Completa

Para guias detalhados, exemplos avançados e referência de features, consulte:

- **[@koalarx/nest](https://github.com/igordrangel/koala-nest)** — Documentação da biblioteca principal
- **[Exemplo de Projeto](./code-base/startup-project)** — Estrutura padrão gerada pela CLI

## 📄 Licença

MIT
