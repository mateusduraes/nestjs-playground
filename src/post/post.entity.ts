import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Comment } from 'src/comment/comment.entity';

@Entity()
export class Post {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  title: string;

  @Column({ length: 1000 })
  content: string;

  @OneToMany(type => Comment, comment => comment.post, { eager: true })
  comments: Comment[];

}
