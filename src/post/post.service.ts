import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class PostService {

  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  getPosts(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async registerPost(post: Post): Promise<Post> {
    post.author = await this.userRepository.findOne(post.author);
    return this.postRepository.save(post);
  }

  async updatePost(id: number, post: Partial<Post>): Promise<any> {
    await this.postRepository.update(id, post);
  }

  async deletePost(id: number): Promise<any> {
    await this.postRepository.delete(id);
  }

}
