const express = require('express');
const router = express.Router();

router.get('/send', (req, res) => {
    res.json({});
});

router.post('/send', (req, res) => {
    console.log('Order request received:', req.body);
    res.json({ status: 'OK', message: 'Order request processed' });
});

module.exports = router;