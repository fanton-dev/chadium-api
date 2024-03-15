import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Task } from '@prisma/client';
import { TaskCreateDto } from './dtos/task-create-dto';

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  // Create a new task
  async createTask(dto: TaskCreateDto, communityId: number): Promise<Task> {
    return this.prismaService.task.create({
      data: {
        name: dto.name,
        description: dto.description,
        state: dto.state,
        communityId: communityId,
      },
    });
  }

  // Get all tasks
  async getAllTasks(communityId: number): Promise<Task[]> {
    return this.prismaService.task.findMany({
      where: { communityId },
    });
  }

  // Get a single task by ID
  async getTaskById(id: number, communityId: number): Promise<Task | null> {
    return this.prismaService.task.findUnique({
      where: { id, communityId },
    });
  }

  // // Update a task by ID
  // async updateTask(id: number, dto: TaskUpdateDto): Promise<Task> {
  //   return this.prismaService.task.update({
  //     where: { id },
  //     data: {
  //       name: dto.name,
  //       description: dto.description,
  //       state: dto.state,
  //       communityId: dto.communityId,
  //     },
  //   });
  // }

  // Delete a task by ID
  async deleteTask(id: number, communityId: number): Promise<Task> {
    return this.prismaService.task.delete({
      where: { id, communityId },
    });
  }

  async assignTask(taskId: number, communityId: number, user: any) {
    return Promise.resolve(undefined);
    // return this.prismaService.task.update({
    //   where: { id: taskId, communityId },
    //   data: {
    //     assignees: {
    //       connect: {
    //         id: user.id,
    //       },
    //     }
    //   }
    // });
  }
}
