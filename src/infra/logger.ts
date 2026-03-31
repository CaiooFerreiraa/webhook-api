import pino from 'pino';

// Em produção (EC2), logs JSON no stdout são padrão para agregadores como CloudWatch, Graylog, ELK.
// No desenvolvimento local, usamos pino-pretty para facilitar a leitura.
const isDev = process.env.NODE_ENV === 'development';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: isDev
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'HH:MM:ss Z',
        },
      }
    : undefined,
  // Adiciona campos base para monitoramento
  base: {
    app: 'log-api',
    env: process.env.NODE_ENV || 'production',
  },
});
