module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'plugin:vue/vue3-essential',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['vue'],
  rules: {
    semi: 'off', // semi = retrait erreur point virgule /
    'comma-dangle': 'off', // comma dangle = retrait erreur virgule /
    'space-before-function-paren': 'off', // space = retrait erreur qui souhaite un espace entre la fonction et sa () /
    'no-undef': 'off', // no undef = retrait car tout est utilisé même si ça provient d'un autre fichier /
    'no-unused-vars': 'off', // Même chose que no undef
  },
};
