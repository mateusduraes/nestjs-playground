import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/post/post.entity';

@Injectable()
export class CommentService {

  constructor(
    @InjectRepository(Comment)
    private readonly commentRepostory: Repository<Comment>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  findAll(): Promise<Comment[]> {
    return this.commentRepostory.find();
  }

  async register(comment: Comment): Promise<Comment> {
    comment.post = await this.postRepository.findOne(comment.post);
    return this.commentRepostory.save(comment);
  }

  async delete(id: number): Promise<void> {
    await this.commentRepostory.delete(id);
  }

}
