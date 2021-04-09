import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { readFileSync } from 'fs';

async function bootstrap() {
  const SERVER_NAME = 'kaveira';
  const ADMIN_PORT = 4200;

  const httpsOptions = {
    key: readFileSync(`/etc/letsencrypt/live/${SERVER_NAME}.omnismart.io/privkey.pem`, 'utf-8'),
    cert: readFileSync(`/etc/letsencrypt/live/${SERVER_NAME}.omnismart.io/cert.pem`, 'utf-8'),
    ca: readFileSync(`/etc/letsencrypt/live/${SERVER_NAME}.omnismart.io/chain.pem`, 'utf-8'),
  };

  const app = await NestFactory.create(AppModule, { httpsOptions });

  await app.listen(ADMIN_PORT);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
