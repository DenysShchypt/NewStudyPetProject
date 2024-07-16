export default (): {
  port: string | undefined;
  db_port: number | undefined;
  db_host: string | undefined;
  db_name: string | undefined;
  db_user: string | undefined;
  db_password: string | undefined;
  secret_jwt: string | undefined;
  expire_jwt: string | undefined;
  refresh_token: string | undefined;
} => ({
  port: process.env.PORT,
  db_port: parseInt(process.env.POSTGRES_PORT, 10),
  db_host: process.env.POSTGRES_HOST,
  db_name: process.env.POSTGRES_DB,
  db_user: process.env.POSTGRES_USER,
  db_password: process.env.POSTGRES_PASSWORD,
  secret_jwt: process.env.SECRET_KEY,
  expire_jwt: process.env.EXPIRE_JWT,
  refresh_token: process.env.REFRESH_TOKEN,
});
