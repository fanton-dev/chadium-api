import { IsDate, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CrowdsourcingUpdateDto {
  @ApiProperty({
    description: 'The updated budget for the crowdsourcing',
    example: 2000.0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  budget?: number;

  @ApiProperty({
    description: 'The updated deadline for the crowdsourcing',
    example: '2025-01-01T23:59:59.999Z',
    type: 'string',
    format: 'date-time',
    required: false,
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  deadline?: Date;
}
