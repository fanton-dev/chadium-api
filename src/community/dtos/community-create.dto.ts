import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CommunityCreateDto {
  @ApiProperty({
    description: 'The name of the community',
    example: 'Gosho Neighborhood',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The description of the community',
    example: 'A neighborhood for all the Gosho fans',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'The color of the community',
    example: '#ff0000',
  })
  @IsNotEmpty()
  @IsString()
  color: string;
}
