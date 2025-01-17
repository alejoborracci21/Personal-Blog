import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ArticlesService {
  private readonly articlesDir = path.join(__dirname, '../../articles-data');

  constructor() {
    if (!fs.existsSync(this.articlesDir)) {
      fs.mkdirSync(this.articlesDir);
    }
  }

  createArticle(title: string, content: string): string {
    const date = Date.now().toString();
    const filePath = path.join(this.articlesDir, `${title}.json`);
    const article = {
      date,
      title,
      content,
      publishedAt: new Date().toISOString(),
    };

    fs.writeFileSync(filePath, JSON.stringify(article, null, 2));
    return `Article ${title} created successfully.`;
  }

  getAllArticles(): any[] {
    const files = fs.readdirSync(this.articlesDir);
    return files.map((file) => {
      const filePath = path.join(this.articlesDir, file);
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    });
  }

  getArticleById(id: string): any {
    const filePath = path.join(this.articlesDir, `${id}.json`);
    if (!fs.existsSync(filePath)) {
      throw new Error('Article not found');
    }
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }
}
