import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostService {

  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  getPosts(): Promise<Post[]> {
    return this.postRepository.find();
  }

  registerPost(post: Post): Promise<Post> {
    return this.postRepository.save(post);
  }

  async updatePost(id: number, post: Partial<Post>): Promise<any> {
    await this.postRepository.update(id, post);
  }

  async deletePost(id: number): Promise<any> {
    await this.postRepository.delete(id);
  }

}
