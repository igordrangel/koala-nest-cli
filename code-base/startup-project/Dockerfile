FROM node:20.18.0 AS builder

# Criando diretório de trabalho
WORKDIR /home/node/app

# Copiando arquivos de configuração
COPY package.json ./
COPY package-lock.json ./
COPY prisma ./prisma/

# Instalando dependências
RUN npm ci --force

# Copiando arquivos do app
COPY . .

# Compilando app
RUN npm run build

FROM node:20.18.0

# Criando diretório de trabalho
WORKDIR /home/node/app

COPY --chown=node:node --from=builder /home/node/app/node_modules ./node_modules
COPY --chown=node:node --from=builder /home/node/app/package.json ./dist/package.json
COPY --chown=node:node --from=builder /home/node/app/package*.json ./
COPY --chown=node:node --from=builder /home/node/app/dist ./dist
COPY --chown=node:node --from=builder /home/node/app/prisma ./prisma

ENV NODE_ENV production

USER node

EXPOSE 3000

CMD npx prisma migrate deploy && npm run start:prod