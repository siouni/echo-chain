import fastify, { FastifyInstance } from 'fastify';
import path from 'path';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import fastifyStatic from '@fastify/static';
import { app } from 'electron';

const server: FastifyInstance = fastify({ logger: true });

// Swagger設定
server.register(swagger, {
  swagger: {
    info: {
      title: 'Test API',
      description: 'API documentation',
      version: '1.0.0',
    },
  },
});

server.register(swaggerUi, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false,
  },
  staticCSP: true,
  transformSpecification: (swaggerObject, request, reply) => {
    return swaggerObject;
  },
  transformSpecificationClone: true,
});

// 静的ファイル配信
const staticDir = path.join(app.getAppPath(), 'client');
server.register(fastifyStatic, {
  root: staticDir,
  prefix: '/', // URLのプレフィックス
});

// サーバー起動
const start = async (): Promise<number> => {
  let port = 3000;
  while (true) {
    try {
      await server.listen({ port: 3000, host: '127.0.0.1' });
      server.log.info(`Server running at http://localhost:${port}`);
      return port;
    } catch (err: any) {
      if (err.code === 'EADDRINUSE') {
        server.log.warn(`Port ${port} is in use, trying next port...`);
        port++;
      } else {
        server.log.error(err);
        throw err;
      }
    }
  }
};

// サーバー停止
const stop = async () => {
  try {
    await server.close();
    server.log.info('Server stopped');
  } catch (err) {
    server.log.error('Error stopping server:', err);
  }
};

export { start, stop };
