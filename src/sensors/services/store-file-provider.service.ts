import { Store } from '../dto/sensor.interfaces';
import { Sensor } from '../entities/sensor.entity';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { SensorUpdateDto } from '../dto/sensor-update.dto';
import { SensorCreateDto } from '../dto/sensor-create.dto';
import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class StoreFileProvider implements Store {
  private sensors: Sensor[] = [];
  private readonly filePath: string;

  constructor(private readonly configService: ConfigService) {
    const configPath = this.configService.get<string>('SENSOR_FILE_PATH');
    this.filePath = path.resolve(__dirname, configPath);
    this.ensureFileExists();
  }

  async deleteOne(id: string): Promise<void> {
    let isFound = false;
    this.sensors = this.sensors.filter((sensor) => {
      if (sensor.id === id) {
        isFound = true;
      }
      return sensor.id !== id;
    });
    this.flushToFileSync();
    if (!isFound) {
      throw new HttpException('Sensor not found', 404);
    }
  }

  async getOne(id: string): Promise<Sensor> {
    const sensor = this.sensors.find((sensor) => sensor.id === id);
    if (!sensor) {
      throw new HttpException('Sensor not found', 404);
    }
    return sensor;
  }

  async getAll(): Promise<Sensor[]> {
    return this.sensors;
  }

  private async ensureFileExists(): Promise<void> {
    if (!fs.existsSync(this.filePath)) {
      try {
        const dir = path.dirname(this.filePath);
        await fs.promises.mkdir(dir, { recursive: true });
        fs.writeFileSync(this.filePath, JSON.stringify([]), 'utf8');
      } catch (e) {
        throw new Error(`Failed to create store file: ${this.filePath}`);
      }
    } else {
      const fileContent = fs.readFileSync(this.filePath, 'utf8');
      this.sensors = JSON.parse(fileContent);
    }
  }

  private flushToFileSync() {
    try {
      const jsonSensors = JSON.stringify(this.sensors, null, 2);
      fs.writeFileSync(this.filePath, jsonSensors, 'utf8');
    } catch (e) {
      console.error('Failed to save sensors to file', e);
    }
  }

  saveOne(sensor: SensorUpdateDto | SensorCreateDto): Promise<string> {
    let id;
    if (sensor instanceof SensorUpdateDto) {
      id = sensor.id;
      let isFound = false;
      this.sensors = this.sensors.map((s) => {
        if (s.id === sensor.id) {
          isFound = true;
          return { ...s, ...sensor };
        }
        return s;
      });
      if (!isFound) {
        throw new HttpException('Sensor not found', 404);
      }
    } else {
      const newSensor = { ...sensor, id: uuidv4() };
      id = newSensor.id;
      this.sensors.push(newSensor);
    }
    this.flushToFileSync();
    return id;
  }
}
