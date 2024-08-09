# Base image
FROM node:16-alpine



# Встановити робочу директорію
WORKDIR /app

# Скопіювати файли з піддиректорії backend
COPY backend/package.json backend/package-lock.json ./
RUN npm install

# Скопіювати всі файли з піддиректорії backend
COPY backend/. .

# Відкрити порт
EXPOSE 4000

# Запустити додаток
CMD ["npm", "run", "start:dev"]


