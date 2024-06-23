import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [UserModule, ProfileModule, PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}