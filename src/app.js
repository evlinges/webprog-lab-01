// Складання Express-застосунку: middleware безпеки, парсери, логування,
// маршрути API та обробники помилок. Створення сервера винесене в index.js.
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const config = require('./config/env');
const apiRoutes = require('./routes');
const { notFound, errorHandler } = require('./utils/errorHandler');

const app = express();

// Безпекові заголовки
app.use(helmet());

// CORS: * або список джерел через кому
app.use(
  cors({
    origin: config.corsOrigin === '*' ? '*' : config.corsOrigin.split(',').map((s) => s.trim()),
  })
);

// Парсинг тіла запиту
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Логування запитів (окрім тестового середовища)
if (config.nodeEnv !== 'test') app.use(morgan('dev'));

// Кореневий маршрут — коротка довідка
app.get('/', (req, res) => {
  res.json({
    name: 'Rezanok API',
    description:
      'Backend системи обліку замовлень майстерні нагород (ЛР1, «Вебпрограмування»)',
    version: '1.0.0',
    endpoints: [
      'GET  /api/health',
      'CRUD /api/clients',
      'CRUD /api/employees',
      'CRUD /api/stock-items',
      'CRUD /api/orders',
      'CRUD /api/order-items',
      'CRUD /api/production-stages',
      'CRUD /api/payments',
      'CRUD /api/shipments',
    ],
  });
});

// Маршрути API
app.use('/api', apiRoutes);

// 404 та централізована обробка помилок (реєструються останніми)
app.use(notFound);
app.use(errorHandler);

module.exports = app;
