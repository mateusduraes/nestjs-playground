import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from './comment.entity';

@Controller('comment')
export class CommentController {

  constructor(
    private readonly commentService: CommentService,
  ) {}

  @Get()
  findAll(): Promise<Comment[]> {
    return this.commentService.findAll();
  }

  @Post()
  register(@Body() comment: Comment): Promise<Comment> {
    return this.commentService.register(comment);
  }

  @Delete(':id')
  delete(@Param() {id}: {id: number}): Promise<any> {
    return this.commentService.delete(id);
  }

}
