import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TaskState } from '@prisma/client'; // Make sure to import TaskState enum from where it's defined

export class TaskUpdateDto {
  @ApiProperty({
    description: 'The updated name of the task',
    example: 'Gosho',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'The updated detailed description of the task',
    example: 'Gosho made a mess in the garden. Please clean it up.',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'The updated state of the task',
    example: TaskState.IN_PROGRESS,
    required: false,
    enum: TaskState,
  })
  @IsOptional()
  @IsEnum(TaskState)
  state?: TaskState;

  @ApiProperty({
    description: 'The updated ID of the associated community',
    example: 2,
    required: false,
  })
  @IsOptional()
  @IsInt()
  communityId?: number;
}
