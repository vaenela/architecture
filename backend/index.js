const express = require('express');
const cors = require('cors');
const sequelize = require('./database/database');

const app = express();
const PORT = 3333;

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const Category = require('./database/models/category');
const Product = require('./database/models/product');
const User = require('./database/models/user');

Category.hasMany(Product);
Product.belongsTo(Category);

const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const saleRoutes = require('./routes/sale');
const orderRoutes = require('./routes/order');
const authRoutes = require('./routes/auth');
const ordersRoutes = require('./routes/orders');

app.use('/categories', categoriesRoutes);
app.use('/products', productsRoutes);
app.use('/sale', saleRoutes);
app.use('/order', orderRoutes);

app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/categories', categoriesRoutes);

app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        message: 'Backend is running successfully!',
        cors: 'Enabled for all origins'
    });
});

app.get('/api/test', (req, res) => {
    res.json({ 
        message: 'API is working!',
        cors: 'Enabled'
    });
});

async function initializeDB() {
    try {
        await sequelize.sync({ force: false });
        console.log('Database synchronized successfully');
        
        const userCount = await User.count();
        if (userCount === 0) {
            const bcrypt = require('bcryptjs');
            const hashedPassword = await bcrypt.hash('admin123', 10);
            await User.create({
                email: 'admin@example.com',
                password: hashedPassword,
                name: 'Admin User',
                role: 'admin'
            });
            console.log('Admin user created: admin@example.com / admin123');
        }
        
    } catch (error) {
        console.error('Database initialization error:', error);
    }
}

initializeDB().then(() => {
    app.listen(PORT, () => {
        console.log(`\n\nServer started on http://localhost:${PORT}`);
    });
}).catch(error => {
    console.error('Failed to start server:', error);
});