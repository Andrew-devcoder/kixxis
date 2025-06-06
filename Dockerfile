FROM node:20

WORKDIR /app

COPY .env ./
COPY prisma ./prisma
RUN npx prisma generate

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY tsconfig.json ./
COPY next.config.ts ./
COPY postcss.config.mjs ./
COPY next-env.d.ts ./

COPY public ./public
COPY scripts ./scripts

COPY src ./src

RUN npm run build

CMD ["npm", "run", "start"]
