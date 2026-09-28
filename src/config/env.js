// Централізоване читання та перевірка змінних середовища.
// Якщо обовʼязкова змінна відсутня — застосунок не стартує з чіткою помилкою.
require('dotenv').config();

function required(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Відсутня обовʼязкова змінна середовища «${name}». ` +
        'Скопіюйте .env.example у .env та заповніть значення.'
    );
  }
  return value;
}

const config = {
  databaseUrl: required('DATABASE_URL'),
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || '*',
};

module.exports = config;
