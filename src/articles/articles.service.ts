import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

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
    const id = this.getNextId();
    const date = Date.now().toString();
    const filePath = path.join(this.articlesDir, `${title}.json`);
    const article = {
      id,
      date,
      title,
      content,
      publishedAt: new Date().toISOString(),
    };

    fs.writeFileSync(filePath, JSON.stringify(article, null, 2));
    return `Article ${title} created successfully with ID ${id}.`;
  }

  getAllArticles(): any[] {
    const files = fs.readdirSync(this.articlesDir);
    return files.map((file) => {
      const filePath = path.join(this.articlesDir, file);
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    });
  }
}