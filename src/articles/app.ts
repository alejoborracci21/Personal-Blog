import * as fs from 'fs';
import * as path from 'path';

// Carpeta donde se almacenarán los artículos
const articlesDir = path.join(__dirname, 'articu');

// Crear la carpeta si no existe
if (!fs.existsSync(articlesDir)) {
  fs.mkdirSync(articlesDir);
}

// Función para crear un nuevo artículo
export function createArticle(title: string, content: string, date = new Date().toISOString()) {
  const article = {
    title,
    content,
    date
  };

  const fileName = `${title.replace(/[\s/\\?%*:|"<>]/g, '_')}.json`; // Reemplaza caracteres no válidos
  const filePath = path.join(articlesDir, fileName);

  fs.writeFile(filePath, JSON.stringify(article, null, 2), (err) => {
    if (err) {
      console.error('Error al guardar el artículo:', err);
      return;
    }
    console.log(`Artículo "${title}" creado con éxito.`);
  });
}

// Función para leer un artículo
function readArticle(title) {
  const fileName = `${title.replace(/[\s/\\?%*:|"<>]/g, '_')}.json`;
  const filePath = path.join(articlesDir, fileName);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.log('Error al leer el artículo:', err);
      return;
    }
    const article = JSON.parse(data);
    console.log('Artículo leído:', article);
  });
}

// Función para listar todos los artículos
function listArticles() {
  fs.readdir(articlesDir, (err, files) => {
    if (err) {
      console.error('Error al listar los artículos:', err);
      return;
    }

    console.log('Artículos disponibles:');
    files.forEach((file) => {
      const filePath = path.join(articlesDir, file);
      const article = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      console.log(`- ${article.title} (Publicado el ${article.date})`);
    });
  });
}


// Ejemplo de uso
createArticle('Mi primer artículo', 'Este es el contenido de mi primer artículo.');
createArticle('Mi segundo artículo', 'Contenido del segundo artículo.');
readArticle('Mi primer artículo');
listArticles();
