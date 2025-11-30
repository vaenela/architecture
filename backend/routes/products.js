const express = require('express');
const Product = require('../database/models/product');

const router = express.Router();

router.get('/all', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        console.error('Error getting products:', error);
        res.status(500).json({ status: 'ERR', message: 'Internal server error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.json({ status: 'ERR', message: 'wrong id' });
        }

        const product = await Product.findByPk(id);
        if (!product) {
            return res.json({ status: 'ERR', message: 'product not found' });
        }

        res.json([product]);

    } catch (error) {
        console.error('Error getting product:', error);
        res.status(500).json({ status: 'ERR', message: 'Internal server error' });
    }
});


router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll({
            include: ['Category']
        });
        res.json(products);
    } catch (error) {
        console.error('Error getting products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { title, price, discont_price, description, image, categoryId } = req.body;

        if (!title || !price) {
            return res.status(400).json({ error: 'Title and price are required' });
        }

        const product = await Product.create({
            title,
            price: parseFloat(price),
            discont_price: discont_price ? parseFloat(discont_price) : null,
            description,
            image: image || '/images/default-product.jpg',
            categoryId: categoryId || 1
        });

        res.status(201).json(product);

    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;