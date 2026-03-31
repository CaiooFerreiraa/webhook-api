import { Elysia, t } from 'elysia';
import { ProcessWebhook } from './application/process-webhook';
import { logger } from './infra/logger';

const app = new Elysia();
const processWebhook = new ProcessWebhook();

// Porta padrão 3000 para EC2 (pode ser configurada no .env ou porta 80).
const PORT = process.env.PORT || 3000;

// Logar quando o servidor sobe
logger.info(`Starting Webhook Simulation Server on port ${PORT}...`);

// Middlewares e Handlers
app
  // Endpoint de status para monitoramento/heartbeat (essencial em EC2)
  .get('/status', () => {
    return {
      status: 'online',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  })
  
  // Capturar qualquer Requisição (GET, POST, PUT, DELETE) em qualquer Rota para Webhook
  .all('*', async ({ request, body, set, path, headers }) => {
    try {
      const method = request.method;
      const ip = (headers['x-forwarded-for'] as string) || 'unknown';

      // Iremos processar o webhook capturando tudo
      await processWebhook.execute({
        method,
        path,
        headers: headers as Record<string, string | undefined>,
        body,
        ip,
      });

      set.status = 200;
      return { 
        message: 'Webhook received and logged.',
        event: {
          path,
          method,
          timestamp: new Date().toISOString()
        }
      };
    } catch (error) {
       logger.error({ error }, 'Failed to process webhook');
       set.status = 500;
       return { error: 'Internal Server Error while logging webhook.' };
    }
  })
  
  .listen(PORT);

logger.info(`Server is listening at ${app.server?.hostname}:${app.server?.port}`);
