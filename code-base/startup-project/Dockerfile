ARG BUN_VERSION=latest
FROM oven/bun:${BUN_VERSION}

# Criando diretório de trabalho
WORKDIR /home/bun/app

# Copiando arquivos de configuração com permissões
COPY --chown=bun:bun package.json bun.lockb ./

# Instalando dependências
RUN bun install --frozen-lockfile

# Copiando o restante do código com permissões
COPY --chown=bun:bun . .

# Compilando o app
RUN bun run build

# Alterando o usuário para "bun" por segurança
USER bun

# Expondo a porta da aplicação
EXPOSE 3000

# Comando para iniciar o app
CMD ["bun", "run", "start:prod"]