import { Sensor } from '../entities/sensor.entity';
import { SensorUpdateDto } from './sensor-update.dto';
import { SensorCreateDto } from './sensor-create.dto';

export enum SensorFirmwareVersion {
  V85 = '85',
  V97 = '97',
  V101 = '101',
}

export interface Store {
  getOne(id: string): Promise<Sensor>;
  getAll(): Promise<Sensor[]>;
  saveOne(sensor: SensorUpdateDto | SensorCreateDto): Promise<string>;
  deleteOne(id: string): Promise<void>;
}
