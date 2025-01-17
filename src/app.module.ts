import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles/articles.module';
import { ArticlesController } from './articles/articles.controller';
import { ArticlesService } from './articles/articles.service';

@Module({
  imports: [ArticlesModule],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class AppModule {}
