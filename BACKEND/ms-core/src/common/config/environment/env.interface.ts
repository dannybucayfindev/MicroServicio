export interface EnvInterface {
  // Server Configuration
  appPort: number;
  nodeEnv: 'development' | 'production' | 'test';
  corsOrigin: string;

  // NATS Configuration
  msNatsServer: string[];

  // Database Configuration
  dbHost: string;
  dbPort: number;
  dbUser: string;
  dbPassword: string;
  dbName: string;
  dbSsl: boolean;

}
