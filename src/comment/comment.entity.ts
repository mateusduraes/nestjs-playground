import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Comment {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  content: string;

}
