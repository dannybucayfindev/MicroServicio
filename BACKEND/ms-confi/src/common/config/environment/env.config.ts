import 'dotenv/config';
import * as joi from 'joi';
import { EnvInterface } from './env.interface';

const envSchema = joi.object({
  // Server Configuration
  appPort: joi.number().required(),
  nodeEnv: joi.string().valid('development', 'production', 'test').default('development'),

  // NATS Configuration
  msNatsServer: joi.array().items(joi.string()).required(),

  // Database Configuration
  dbHost: joi.string().required(),
  dbPort: joi.number().required(),
  dbUser: joi.string().required(),
  dbPassword: joi.string().required(),
  dbName: joi.string().required(),
  dbSsl: joi.boolean().required(),

}).unknown(true);

const { error, value } = envSchema.validate({
  ...process.env,
  msNatsServer: process.env.msNatsServer?.split(','),
  appPort: parseInt(process.env.appPort || '8000'),
  dbPort: parseInt(process.env.dbPort || '6432'),
  dbSsl: process.env.dbSsl === 'true',
});

if (error) {
  throw new Error(`Configuración de validación error: ${error.message}`);
}

const envVars: EnvInterface = value;

export const envs = {
  port: envVars.appPort,
  nodeEnv: envVars.nodeEnv,
  ms: {
    natsServer: envVars.msNatsServer,
  },
  db: {
    host: envVars.dbHost,
    port: envVars.dbPort,
    username: envVars.dbUser,
    password: envVars.dbPassword,
    name: envVars.dbName,
    ssl: envVars.dbSsl,
   
  }
};
