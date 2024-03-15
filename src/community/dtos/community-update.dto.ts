import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CommunityUpdateDto {
  @ApiProperty({
    description: 'The name of the community',
    example: 'Gosho Neighborhood #2',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'The description of the community',
    example: 'A neighborhood for all the Gosho fans #2',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'The color of the community',
    example: '#ff0011',
  })
  @IsOptional()
  @IsString()
  color?: string;
}
