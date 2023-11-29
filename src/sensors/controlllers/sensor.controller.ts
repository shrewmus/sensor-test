import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SensorService } from '../services/sensor.service';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { SensorUpdateDto } from '../dto/sensor-update.dto';
import { SensorCreateDto } from '../dto/sensor-create.dto';
import { Sensor } from '../entities/sensor.entity';

// it seems a good idea to put all controller under auth
// since it just example - no auth here but nestjs has a good auth practices so
// it can be easily added by using @UseGuards() decorator and @ApiBearerAuth() decorator
// for sure need to set up authorization guards

@ApiTags('sensors')
@Controller('sensors')
export class SensorController {
  constructor(private readonly sensorService: SensorService) {}

  // note: here can be pagination - limit/page and offset/page size
  @ApiOperation({ summary: 'Get all sensors' })
  @ApiOkResponse({ description: 'All Sensors' })
  @Get()
  async getAllSensors(): Promise<Sensor[]> {
    return await this.sensorService.getAllSensors();
  }

  @ApiOperation({ summary: 'Get sensor by id' })
  @ApiOkResponse({ description: 'Sensor' })
  @ApiParam({ name: 'id', type: String, description: 'Sensor id' })
  @Get(':id')
  async getSensorById(@Param('id') id: string): Promise<Sensor> {
    return await this.sensorService.getSensorById(id);
  }

  @ApiOperation({ summary: 'Delete sensor by id' })
  @ApiParam({ name: 'id', type: String, description: 'Sensor id' })
  @Delete(':id')
  async deleteSensorById(@Param('id') id: string) {
    return await this.sensorService.deleteSensorById(id);
  }

  @ApiOperation({ summary: 'Create sensor' })
  @ApiBody({ type: SensorCreateDto })
  @ApiOkResponse({ description: 'Sensor id', type: String })
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createSensor(@Body() sensorCreateDto: SensorCreateDto) {
    return await this.sensorService.createSensor(sensorCreateDto);
  }

  @ApiOperation({ summary: 'Update sensor' })
  @ApiBody({ type: SensorUpdateDto })
  @Put()
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateSensor(@Body() sensorUpdateDto: SensorUpdateDto) {
    return await this.sensorService.updateSensor(sensorUpdateDto);
  }
}
