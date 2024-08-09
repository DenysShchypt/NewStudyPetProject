Authorization with SSH on GitHub
git init
git remote add origin "your link HSS"
git remote -v
git add .
git commit -m "
git push origin master

create new branch
git checkout -b feat/newBranches
git checkout -b bugFix/newBranches

NestJS new modules
nest g module name-module
nest g controller name-controller --no-spec
nest g service name-service --no-spec

Docker
docker-compose up

Prisma

1. npm install prisma --save-dev
2. npm install @prisma/client
3. npx prisma init
4. npx prisma migrate dev  --name new_migrate   add changes
-- You need to make chang in .env (name,password,localhost,nameDB)

JWT

1. npm install --save @nestjs/passport passport passport-jwt
2. npm install --save-dev @types/passport-jwt
3. npm install --save @nestjs/jwt
4. npm i @nestjs/config
