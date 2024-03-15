import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CrowdsourcingCreateDto {
  @ApiProperty({
    description: 'The budget for the crowdsourcing',
    example: 1500.0,
  })
  @IsNotEmpty()
  @IsNumber()
  budget: number;

  @ApiProperty({
    description: 'The deadline for the crowdsourcing',
    example: '2024-12-31T23:59:59.999Z',
    type: 'string',
    format: 'date-time',
  })
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  deadline: Date;

  @ApiProperty({
    description: 'The unique identifier of the task',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  taskId: number;
}
