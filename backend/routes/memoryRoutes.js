const express = require('express');
const router = express.Router();
const memoryController = require('../controllers/memoryController');

router.post('/add', memoryController.addMemory);
router.put('/edit/:id', memoryController.editMemory);
router.get('/list', memoryController.listMemories);

module.exports = router;
