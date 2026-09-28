// Кореневий роутер API. Підключає перевірку стану та роути кожної сутності.
const { Router } = require('express');
const asyncHandler = require('../utils/asyncHandler');
const prisma = require('../models/prisma');

const router = Router();

// Перевірка стану сервера та зʼєднання з базою даних.
router.get(
  '/health',
  asyncHandler(async (req, res) => {
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      success: true,
      status: 'ok',
      db: 'connected',
      time: new Date().toISOString(),
    });
  })
);

router.use('/clients', require('./client.routes'));
router.use('/employees', require('./employee.routes'));
router.use('/stock-items', require('./stockItem.routes'));
router.use('/orders', require('./order.routes'));
router.use('/order-items', require('./orderItem.routes'));
router.use('/production-stages', require('./productionStage.routes'));
router.use('/payments', require('./payment.routes'));
router.use('/shipments', require('./shipment.routes'));

module.exports = router;
