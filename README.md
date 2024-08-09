Authorization with SSH on GitHub
1. git init
2. git remote add origin "your link HSS"
3. git remote -v
4. git add .
5. git commit -m "
6. git push origin master

Create new branch
1. git checkout -b feat/newBranches
2. git checkout -b bugFix/newBranches

NestJS new modules
1. nest g module name-module
2. nest g controller name-controller --no-spec
3. nest g service name-service --no-spec

Docker
1. docker-compose up

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
