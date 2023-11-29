import { SensorFirmwareVersion } from './sensor.interfaces';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SensorUpdateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({ enum: SensorFirmwareVersion })
  @IsNotEmpty()
  @IsEnum(SensorFirmwareVersion, {
    message: 'Firmware version must be one of: 85, 97, 101',
  })
  firmwareVersion: SensorFirmwareVersion;
}
