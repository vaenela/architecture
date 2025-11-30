const express = require('express');
const router = express.Router();

router.get('/send', (req, res) => {
    res.json({});
});

router.post('/send', (req, res) => {
    console.log('Sale request received:', req.body);
    res.json({ status: 'OK', message: 'Sale request processed' });
});

module.exports = router;