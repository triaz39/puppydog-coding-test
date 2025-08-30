import { Router } from '../routers';
import { notFound } from '../handlers';
import { healthController } from '../controllers/health.controller';
import { getTitlesController } from '../controllers/title.controller';

export function createRoutes(): Router {
  return new Router(notFound)
    .get('/health', healthController)
    .get('/I/want/title', getTitlesController);
}
