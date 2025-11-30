const Category = require('../database/models/category');
const Product = require('../database/models/product');

const express = require('express');
const router = express.Router();

router.get('/all', async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (error) {
        console.error('Error getting categories:', error);
        res.status(500).json({ status: 'ERR', message: 'Internal server error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.json({ status: 'ERR', message: 'wrong id' });
        }

        const products = await Product.findAll({ where: { categoryId: +id } });
        const category = await Category.findOne({ where: { id: +id } });

        if (!category) {
            return res.json({ status: 'ERR', message: 'category not found' });
        }

        res.json({
            category,
            data: products
        });

    } catch (error) {
        console.error('Error getting category:', error);
        res.status(500).json({ status: 'ERR', message: 'Internal server error' });
    }
});

module.exports = router;