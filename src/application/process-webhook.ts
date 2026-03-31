import { logger } from '../infra/logger';

export interface WebhookRequest {
  method: string;
  path: string;
  headers: Record<string, string | undefined>;
  body: unknown;
  ip: string;
}

export class ProcessWebhook {
  async execute(req: WebhookRequest): Promise<void> {
    // Implementa amostragem (Sampling) para reduzir custos
    const samplingRate = Number(process.env.LOG_SAMPLING_RATE || '1'); // 1 = 100%
    if (Math.random() > samplingRate) return;

    // Trunca o body se for muito grande
    const MAX_BODY_SIZE = 1024; // 1KB
    const bodyString = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    const truncatedBody = bodyString.length > MAX_BODY_SIZE 
      ? bodyString.substring(0, MAX_BODY_SIZE) + '... [TRUNCATED]'
      : req.body;

    logger.info({
      type: 'webhook_received',
      ...req,
      body: truncatedBody,
      timestamp: new Date().toISOString(),
    }, `Webhook event received: ${req.path}`);

    // Aqui poderíamos salvar em arquivo se o usuário preferir, 
    // mas stdout é o padrão moderno para EC2.
  }
}
