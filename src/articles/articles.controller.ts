import { Controller, Get, Post, Param, Body, Put, Patch } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Article } from './interfaces';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post("/admin")
  createArticle(@Body() createArticleDto: { title: string; content: string }) {
    return this.articlesService.createArticle(createArticleDto.title, createArticleDto.content);
  }

  @Get()
  findAll(): Article[] {
    return this.articlesService.getAllArticles();
  }

  @Get("/:id")
  findArticleId(@Param('id') id: string): Article {
    return this.articlesService.getArticleById(id);
  }

  @Patch("/:id")
  updateArticle(@Param('id') id: string, @Body() updateArticleDto: { title: string; content: string }): Article {
    return this.articlesService.updateArticle(id, updateArticleDto.title, updateArticleDto.content);
  }
}