import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskCreateDto } from './dtos/task-create-dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('api/communities')
@ApiTags('Tasks API')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post(':communityId/tasks')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new task within a community' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Task created within the community.',
  })
  @ApiParam({ name: 'communityId', required: true })
  async createTask(
    @Param('communityId', ParseIntPipe) communityId: number,
    @Body() dto: TaskCreateDto,
  ) {
    return await this.tasksService.createTask(dto, communityId);
  }

  @Get(':communityId/tasks/:taskId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Retrieve a task's details" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Task details returned successfully.',
  })
  @ApiParam({ name: 'communityId', required: true })
  @ApiParam({ name: 'taskId', required: true })
  async getTaskById(
    @Param('communityId', ParseIntPipe) communityId: number,
    @Param('taskId', ParseIntPipe) taskId: number,
  ) {
    return await this.tasksService.getTaskById(taskId, communityId);
  }

  // @Put(':communityId/tasks/:taskId')
  // @HttpCode(HttpStatus.OK)
  // @ApiOperation({ summary: "Update a task's details" })
  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   description: 'Task updated successfully.',
  // })
  // @ApiParam({ name: 'communityId', required: true })
  // @ApiParam({ name: 'taskId', required: true })
  // async updateTask(
  //   @Param('communityId', ParseIntPipe) communityId: number,
  //   @Param('taskId', ParseIntPipe) taskId: number,
  //   @Body() dto: TaskUpdateDto,
  // ) {
  //   // Include logic to ensure the task belongs to the community
  //   return await this.tasksService.updateTask(taskId, dto);
  // }

  @Delete('tasks/:communityId/:taskId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a task' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Task deleted successfully.',
  })
  @ApiParam({ name: 'communityId', required: true })
  @ApiParam({ name: 'taskId', required: true })
  async deleteTask(
    @Param('communityId', ParseIntPipe) communityId: number,
    @Param('taskId', ParseIntPipe) taskId: number,
  ) {
    return await this.tasksService.deleteTask(taskId, communityId);
  }

  @Get(':communityId/tasks')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieve all tasks within a community' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All tasks returned successfully.',
  })
  @ApiParam({ name: 'communityId', required: true })
  async getAllTasks(@Param('communityId', ParseIntPipe) communityId: number) {
    // Include logic to retrieve only tasks that belong to the community
    return await this.tasksService.getAllTasks(communityId);
  }

  @Put(':communityId/tasks/:taskId/assign')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Assign a task to users' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Task assigned successfully.',
  })
  @ApiParam({ name: 'communityId', required: true })
  @ApiParam({ name: 'taskId', required: true })
  async assignTask(
    @Param('communityId', ParseIntPipe) communityId: number,
    @Param('taskId', ParseIntPipe) taskId: number,
    // Include any additional parameters or body required for the assignment
    user: any,
  ) {
    return await this.tasksService.assignTask(taskId, communityId, user);
  }
}
