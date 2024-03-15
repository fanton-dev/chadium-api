import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TaskState } from '@prisma/client'; // Make sure to import TaskState enum from where it's defined

export class TaskCreateDto {
  @ApiProperty({
    description: 'The name of the task',
    example: "Gosho's mess.",
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The detailed description of the task',
    example:
      'Gosho made a mess in the garden. Please clean it up. Very bad gosho',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The current state of the task',
    example: TaskState.TODO,
    enum: TaskState,
  })
  @IsEnum(TaskState)
  state: TaskState;
}
