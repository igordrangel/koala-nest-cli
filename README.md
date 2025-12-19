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

## 🚀 Uso Rápido

```bash
# Criar novo projeto
koala-nest new meu-projeto

# Entrar no diretório
cd meu-projeto

# Iniciar desenvolvimento (as dependências são instaladas automaticamente com bun)
bun start:dev
```

> **Nota:** A CLI utiliza **Bun** por debaixo dos panos para instalar os pacotes do projeto no comando `koala-nest new`. Isso torna o processo mais rápido e eficiente.

## Comandos Disponíveis

### `prisma:generate`

Comando especializado que substitui o comando nativo do Prisma para compatibilidade com a biblioteca `@koalarx/nest`.

```bash
bun run prisma:generate
```

#### O problema:

As versões mais recentes do Prisma utilizam um provider que gera arquivos de cliente com importações que não funcionam corretamente ao ser integrados com a biblioteca `@koalarx/nest`. O comando nativo `prisma generate` não resolve esses problemas automaticamente.

#### A solução:

Este comando executa uma sequência de operações para corrigir os importes e garantir compatibilidade total:

1. **`prisma generate`** — Gera o cliente Prisma baseado no schema atual
2. **`tsc --project tsconfig.build-prisma.json`** — Compila os arquivos TypeScript gerados na pasta `prisma/generated` para JavaScript utilizando a configuração específica do Prisma
3. **`bun prisma/scripts/fix-extensions.mjs`** — Corrige os importes ESM dos arquivos compilados, adicionando extensões `.js` onde necessário

#### Por que não usar `prisma generate` diretamente:

O comando nativo do Prisma gera importações relativas sem extensão (ex: `from './generated'`), que não funcionam corretamente com ESM e causam incompatibilidades com a biblioteca `@koalarx/nest`. Este comando customizado resolve isso automaticamente.

#### Quando executar:

- Após modificar `prisma/schema.prisma`
- Ao atualizar as versões do Prisma ou NestJS
- Antes de fazer deploy em produção (incluído no CI/CD)

> **Importante:** Sempre use `bun run prisma:generate` ao invés do comando nativo `prisma generate` ao trabalhar com projetos `@koalarx/nest`.

## Documentação Completa

Para guias detalhados, exemplos avançados e referência de features, consulte:

- **[@koalarx/nest](https://github.com/igordrangel/koala-nest)** — Documentação da biblioteca principal
- **[Exemplo de Projeto](./code-base/startup-project)** — Estrutura padrão gerada pela CLI

## 📄 Licença

MIT
