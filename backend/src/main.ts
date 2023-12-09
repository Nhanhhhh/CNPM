import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const cors = require("cors");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const option: cors.CorsOptions = {
  //   origin: "*"
  // };

  app.use(cors({
    origin: "*",
  }));
  
  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }));
  await app.listen(3000);
}
bootstrap();
