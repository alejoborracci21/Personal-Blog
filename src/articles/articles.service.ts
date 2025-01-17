import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

interface Article {
  id: string;
  date: string;
  title: string;
  content: string;
  publishedAt: string;
}

@Injectable()
export class ArticlesService {
  private readonly articlesDir = path.join(__dirname, '../../articles-data');
  private readonly idCounterFile = path.join(this.articlesDir, 'id-counter.txt');

  constructor() {
    if (!fs.existsSync(this.articlesDir)) {
      fs.mkdirSync(this.articlesDir);
    }
    if (!fs.existsSync(this.idCounterFile)) {
      fs.writeFileSync(this.idCounterFile, '0');
    }
  }

  private getNextId(): number {
    const currentId = parseInt(fs.readFileSync(this.idCounterFile, 'utf-8'), 10);
    const nextId = currentId + 1;
    fs.writeFileSync(this.idCounterFile, nextId.toString());
    return nextId;
  }

  createArticle(title: string, content: string): string {
    const id = this.getNextId().toString();
    const date = Date.now().toString();
    const filePath = path.join(this.articlesDir, `${title}.json`);
    const article: Article = {
      id,
      date,
      title,
      content,
      publishedAt: new Date().toISOString(),
    };

    fs.writeFileSync(filePath, JSON.stringify(article));
    return `Article ${title} created successfully with ID ${id}.`;
  }

  getAllArticles(): Article[] {
    const files = fs.readdirSync(this.articlesDir).filter(file => file !== 'id-counter.txt');
    return files.map((file) => {
      const filePath = path.join(this.articlesDir, file);
      return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as Article;
    });
  }

  getArticleById(id: string): Article {
    const files = fs.readdirSync(this.articlesDir).filter(file => file !== 'id-counter.txt');
    const article = files
      .map((file) => {
        const filePath = path.join(this.articlesDir, file);
        return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as Article;
      })
      .find((article) => {
        return article.id === id;
      });

    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found.`);
    }

    return article;
  }
}