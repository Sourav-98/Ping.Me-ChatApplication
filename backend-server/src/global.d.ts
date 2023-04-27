export namespace NodeJS {
  interface ProcessEnv {
    DB_PORT: number;
    DB_USER: string;
    SERVER_HOST: string;
    SERVER_PORT: string;
    JWT_SHARED_SECRET: string;
    MONGODB_URI: string;
    ENV: "test" | "dev" | "prod";
  }
}
