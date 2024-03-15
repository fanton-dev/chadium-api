import { ApiProperty } from '@nestjs/swagger';

export class UserCreateFromDiscordDto {
  @ApiProperty({
    description: 'User email address.',
    example: 'gosho@example.com',
  })
  email!: string;

  @ApiProperty({
    description: 'User discord id.',
    example: '12345678901234567890',
  })
  discordId!: string;
}
