import { Module } from '@nestjs/common';
import { SensorController } from './controlllers/sensor.controller';
import { SensorService } from './services/sensor.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StoreFileProvider } from './services/store-file-provider.service';
import { Store } from './dto/sensor.interfaces';

@Module({
  imports: [ConfigModule],
  controllers: [SensorController],
  providers: [
    {
      provide: 'Store',
      useFactory: (configService: ConfigService): Store => {
        return new StoreFileProvider(configService);
      },
      inject: [ConfigService],
    },
    SensorService,
  ],
})
export class SensorsModule {}
