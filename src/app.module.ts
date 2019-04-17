import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { TagsModule } from './tags/tags.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [UsersModule, PostsModule, TagsModule, CommentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
