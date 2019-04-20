import { Controller, Get, Patch, Delete, Post as PostHTTP, Body, Param } from '@nestjs/common';
import { Post } from './post.entity';
import { PostService } from './post.service';

@Controller('post')
export class PostController {

  constructor(
    private readonly postService: PostService,
    ) {}

  @Get()
  async findAll(): Promise<Post[]> {
    return this.postService.getPosts();
  }

  @PostHTTP()
  async registerPost(@Body() post: Post) {
    return this.postService.registerPost(post);
  }

  @Patch(':id')
  async updatePost(@Param() { id }: {id: number}, @Body()post: Partial<Post>) {
    return this.postService.updatePost(id, post);
  }

  @Delete(':id')
  async deletePost(@Param() { id }: {id: number}) {
    return this.postService.deletePost(id);
  }

}
