import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export class AiRequestDto {
  @ApiProperty({
    description: 'The title of the task',
    example: 'Apartment Building Residents',
  })
  title: string;
  @ApiProperty({
    description: 'The model to use for the task',
    example: 'gpt-4',
  })
  model: string;
}

export class PostSummaryRequestDto {
  @ApiProperty({
    description: 'The model to use for the task',
    example: 'gpt-4',
  })
  model: string;
  @ApiProperty({
    description: 'The array of posts to summarize',
    example: ['I am happy', 'I am sad', 'I am angry'],
  })
  posts: string[];
}
export class PostDescriptionRequestDto {
  @ApiProperty({
    description: 'The model to use for the task',
    example: 'gpt-4',
  })
  model: string;
  @ApiProperty({
    description: 'The title of the post',
    example: 'Apartment Building Residents',
  })
  title: string;
}

export class ImageGenerationRequestDto {
  @ApiProperty({
    description: 'The model to use for the task',
    example: 'dalle-3',
  })
  model: string;
  @ApiProperty({
    description: 'The prompt for the image generation',
    example: 'A cat sitting on a chair',
  })
  prompt: string;
  @ApiProperty({
    description: 'The number of images to generate',
    example: 1,
  })
  n: number;
}

@Controller({ path: 'ai' })
@ApiTags('AI API')
export class AiController {
  constructor(private readonly httpService: HttpService) {}

  @Post('generate-task')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Generate a detailed task description from a title',
    description:
      'Uses OpenAI to generate a detailed task description based on the provided title.',
  })
  @ApiOkResponse({
    description: 'Detailed task description generated successfully.',
  })
  generateTaskDescription(@Body() dto: AiRequestDto): Observable<any> {
    const payload = {
      model: dto.model,
      messages: [
        {
          role: 'system',
          content:
            'Generate a detailed task description from its title for apartment building residents. Adapt your response to the goal indicated by the title. Respond in Bulgarian for Cyrillic titles. Output should be in bullet points within a JSON array named "bulletPoints". Only the JSON is required.',
        },
        {
          role: 'user',
          content: dto.title,
        },
      ],
    };

    return this.httpService
      .post('https://api.openai.com/v1/chat/completions', payload, {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      })
      .pipe(map((response) => response.data));
  }

  @Post('generate-summary')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Generate a summary from an array of posts',
    description:
      'Uses OpenAI to generate a summary of the provided array of posts.',
  })
  @ApiOkResponse({
    description: 'Summary generated successfully.',
  })
  generatePostSummary(@Body() dto: PostSummaryRequestDto): Observable<any> {
    const payload = {
      model: dto.model,
      messages: [
        {
          role: 'system',
          content:
            "Summarize apartment community updates from residents' posts. Deliver a brief, understandable summary. Use English for Cyrillic tasks.",
        },
        {
          role: 'user',
          content: JSON.stringify(dto.posts),
        },
      ],
    };

    return this.httpService
      .post('https://api.openai.com/v1/chat/completions', payload, {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      })
      .pipe(map((response) => response.data));
  }

  @Post('generate-post-description')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Generate a short post description from its title',
    description:
      'Uses OpenAI to generate a short description for a given post title.',
  })
  @ApiOkResponse({
    description: 'Post description generated successfully.',
  })
  generatePostDescription(
    @Body() dto: PostDescriptionRequestDto,
  ): Observable<any> {
    const payload = {
      model: dto.model,
      messages: [
        {
          role: 'system',
          content:
            'Generate a short post description from its title for apartment building residents. Adapt your response to the goal indicated by the title. Respond in Bulgarian for Cyrillic titles. You play the role of apartment user that gives information. Check for grammar and punctuation errors and fix them',
        },
        {
          role: 'user',
          content: dto.title,
        },
      ],
    };

    return this.httpService
      .post('https://api.openai.com/v1/chat/completions', payload, {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      })
      .pipe(map((response) => response.data));
  }

  @Post('generate-image')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Generate an image from a description',
    description:
      'Uses OpenAI DALL·E to generate an image based on the provided description.',
  })
  @ApiOkResponse({
    description: 'Image generated successfully.',
  })
  generateImage(@Body() dto: ImageGenerationRequestDto): Observable<any> {
    return this.httpService
      .post(
        'https://api.openai.com/v1/images/generations',
        {
          model: dto.model,
          prompt: dto.prompt,
          n: dto.n,
          size: '1792x1024',
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .pipe(map((response) => response.data));
  }
}
