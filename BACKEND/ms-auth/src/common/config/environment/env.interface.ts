export interface EnvInterface {
  // Server Configuration
  appPort: number;
  nodeEnv: 'development' | 'production' | 'test';

  // NATS Configuration
  msNatsServer: string[];

  // JWT Configuration
  jwtSecret: string;
  jwtExpiresIn: string;
  jwtRefreshIn: string;

  // Database Configuration
  dbHost: string;
  dbPort: number;
  dbUser: string;
  dbPassword: string;
  dbName: string;
  dbSsl: boolean;
}
