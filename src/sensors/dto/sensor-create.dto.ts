import { SensorFirmwareVersion } from './sensor.interfaces';
import { IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SensorCreateDto {
  @ApiProperty({ enum: SensorFirmwareVersion })
  @IsEnum(SensorFirmwareVersion, {
    message: 'Firmware version must be one of: 85, 97, 101',
  })
  @Transform(({ value }) =>
    value !== undefined ? value : SensorFirmwareVersion.V85,
  )
  firmwareVersion: SensorFirmwareVersion;
}
