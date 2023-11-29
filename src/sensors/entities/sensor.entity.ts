import { SensorFirmwareVersion } from '../dto/sensor.interfaces';

export class Sensor {
  id?: string;
  firmwareVersion: SensorFirmwareVersion;
}
