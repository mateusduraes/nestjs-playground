import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CommentService {

  constructor(
    @InjectRepository(Comment)
    private readonly commentRepostory: Repository<Comment>,
  ) {}

  findAll(): Promise<Comment[]> {
    return this.commentRepostory.find();
  }

  register(comment: Comment): Promise<Comment> {
    return this.commentRepostory.save(comment);
  }

  async delete(id: number): Promise<void> {
    await this.commentRepostory.delete(id);
  }

}
