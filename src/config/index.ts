export default () => ({
  PORT: (process.env.PORT ?? '8000') as string,
  STATIC_PATH: (process.env.STATIC_PATH ?? 'static') as string,
  LIMIT: '100mb',
  JWT_ACCESS_SECRET: (process.env.JWT_ACCESS_SECRET
    ?? 'accessSecretKey') as string,
  JWT_REFRESH_SECRET: (process.env.JWT_REFRESH_SECRET
    ?? 'refreshSecretKey') as string,
  NODE_ENV: (process.env.NODE_ENV ?? 'development') as string,
});
