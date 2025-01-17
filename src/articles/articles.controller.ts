import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post("/")
  createArticle(@Body() createArticleDto: { title: string; content: string }) {
    return this.articlesService.createArticle(createArticleDto.title, createArticleDto.content);
  }

  @Get("/")
  findAll(): any[] {
    return this.articlesService.getAllArticles();
  }

}
