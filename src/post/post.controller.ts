import { Controller, Get, Patch, Delete, Post as PostHTTP, Body, Param } from '@nestjs/common';
import { Post } from './post.entity';
import { PostService } from './post.service';

@Controller('post')
export class PostController {

  constructor(
    private readonly postService: PostService,
    ) {}

  @Get()
  findAll(): Promise<Post[]> {
    return this.postService.getPosts();
  }

  @PostHTTP()
  registerPost(@Body() post: Post) {
    return this.postService.registerPost(post);
  }

  @Patch(':id')
  updatePost(@Param() { id }: {id: number}, @Body()post: Partial<Post>) {
    return this.postService.updatePost(id, post);
  }

  @Delete(':id')
  deletePost(@Param() { id }: {id: number}) {
    return this.postService.deletePost(id);
  }

}
