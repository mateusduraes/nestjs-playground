import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { UserModule } from 'src/user/user.module';
import { TagModule } from 'src/tag/tag.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    UserModule,
    TagModule,
  ],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
