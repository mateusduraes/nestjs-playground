import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Comment } from 'src/comment/comment.entity';
import { User } from 'src/user/user.entity';
import { Tag } from 'src/tag/tag.entity';

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

  @ManyToOne(type => User, user => user.posts, { eager: true, nullable: false })
  author: User;

  @ManyToMany(type => Tag, { eager: true })
  @JoinTable()
  tags: Tag[];

}
