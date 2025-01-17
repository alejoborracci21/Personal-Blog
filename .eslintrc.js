module.exports = {
  parserOptions: {
    ecmaVersion: 2022, // o la versión más reciente de ECMAScript
    sourceType: "module" // Esta línea es la clave para indicar que usas ESM
  },
  env: {
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  rules: {
    // Puedes ajustar tus reglas aquí
  }
};
