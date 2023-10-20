import { Module } from '@nestjs/common';
import { StoresController } from './stores.controller';
import { Store } from './store.entity';
import { StoresService } from './stores.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Store])],
  providers: [StoresService],
  controllers: [StoresController],
})
export class StoresModule {}
