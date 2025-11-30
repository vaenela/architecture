const express = require('express');
const router = express.Router();

let orders = [];
let orderIdCounter = 1;

router.post('/', async (req, res) => {
    try {
        console.log('📦 Order creation request:', req.body);
        
        const { items, total, address, customerName, customerEmail, customerPhone } = req.body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'Order items are required' });
        }

        if (!total || !address || !customerName || !customerEmail) {
            return res.status(400).json({ 
                error: 'Total, address, name and email are required',
                received: {
                    total: !!total,
                    address: !!address, 
                    customerName: !!customerName,
                    customerEmail: !!customerEmail
                }
            });
        }

        const order = {
            orderId: orderIdCounter++,
            items,
            total: parseFloat(total),
            address,
            customerName,
            customerEmail,
            customerPhone: customerPhone || '',
            status: 'created',
            createdAt: new Date()
        };

        orders.push(order);
        console.log('Order created successfully:', order.orderId);

        res.status(201).json({
            orderId: order.orderId,
            status: order.status
        });

    } catch (error) {
        console.error('Create order error:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            details: error.message 
        });
    }
});

router.get('/', async (req, res) => {
    try {
        res.json(orders);
    } catch (error) {
        console.error('Get orders error:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            details: error.message 
        });
    }
});

module.exports = router;