import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DiscordLoginQueryDto {
  @ApiProperty({
    description: 'Discord authentication code.',
  })
  @IsString()
  code?: string;
}

export default DiscordLoginQueryDto;
