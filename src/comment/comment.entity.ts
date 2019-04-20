import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Post } from 'src/post/post.entity';

@Entity()
export class Comment {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  content: string;

  @ManyToOne(type => Post, post => post.comments, { nullable: false })
  post: Post;

}
