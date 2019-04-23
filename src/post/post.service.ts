import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { User } from 'src/user/user.entity';
import { Tag } from 'src/tag/tag.entity';

@Injectable()
export class PostService {

  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  getPosts(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async registerPost(post: Post): Promise<Post> {
    if (post.tags && post.tags.length) {
      const tags = await this.tagRepository.findByIds(post.tags);      
      post.tags = tags;
    }
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
