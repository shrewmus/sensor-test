import { Inject, Injectable } from '@nestjs/common';
import { SensorUpdateDto } from '../dto/sensor-update.dto';
import { SensorCreateDto } from '../dto/sensor-create.dto';
import { Store } from '../dto/sensor.interfaces';

@Injectable()
export class SensorService {
  constructor(@Inject('Store') private storeProvider: Store) {}

  /**
   * in case of using a database, method should be async
   */
  async getAllSensors() {
    return this.storeProvider.getAll();
  }

  async getSensorById(id: string) {
    return this.storeProvider.getOne(id);
  }

  async deleteSensorById(id: string) {
    return this.storeProvider.deleteOne(id);
  }

  async updateSensor(sensorUpdateDto: SensorUpdateDto) {
    return await this.storeProvider.saveOne(sensorUpdateDto);
  }

  async createSensor(sensorCreateDto: SensorCreateDto) {
    return await this.storeProvider.saveOne(sensorCreateDto);
  }
}
