ARG NODE_VERSION=23.11.0-slim
FROM node:${NODE_VERSION}

# Criando diretório de trabalho
WORKDIR /home/node/app

# Copiando arquivos de configuração com permissões
COPY --chown=node:node package.json package-lock.json ./

# Instalando dependências
RUN npm ci

# Copiando o restante do código com permissões
COPY --chown=node:node . .

# Compilando o app
RUN npm run build

# Alterando o usuário para "node" por segurança
USER node

# Expondo a porta da aplicação
EXPOSE 3000

# Comando para iniciar o app
CMD ["npx", "prisma", "migrate", "deploy", "&&", "npm", "run", "start:prod"]