# E-commerce API Documentation

## Base URL
http://localhost:3333/api

API доступен по набору эндпоинтов:
- /api/auth,
- /api/products,
- /api/orders,
- /api/categories

## Authentication

Все защищенные endpoints требуют JWT токен в заголовке Authorization.

### Register User
**POST** `/auth/register`

Создает нового пользователя в системе.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```
**Response (201 Created):**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "createdAt": "2024-01-15T10:00:00.000Z"
}
```

**Response (400 Bad Request):**
```json
{
  "error": "User with this email already exists"
}
```

### Login User
**POST** `/auth/login`

Аутентификация пользователя и получение JWT токена.

**Request:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2024-01-15T10:00:00.000Z"
  }
}
```

**Response (401 Unauthorized):**
```json
{
  "error": "Invalid email or password"
}
```

### Get Current User
**GET** `/auth/me`

Получение информации о текущем аутентифицированном пользователе.

**Headers:**
```text
Authorization: Bearer <jwt-token>
```

**Response (200 OK):**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "createdAt": "2024-01-15T10:00:00.000Z"
}
```

**Response (401 Unauthorized):**
```json
{
  "error": "Invalid token"
}
```

## Products
### Get All Products
**GET** `/products`

Получение списка всех товаров.

**Headers:**
```text
Authorization: Bearer <jwt-token>
```

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "title": "Rose Plant",
    "price": 29.99,
    "discont_price": 24.99,
    "description": "Beautiful red rose plant for your garden",
    "image": "/images/rose.jpg",
    "categoryId": 1,
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T10:00:00.000Z"
  },
  {
    "id": 2,
    "title": "Gardening Shovel",
    "price": 15.99,
    "discont_price": null,
    "description": "High-quality gardening shovel",
    "image": "/images/shovel.jpg",
    "categoryId": 2,
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T10:00:00.000Z"
  }
]
```

### Get Product by ID
**GET** `/products/:id`

Получение информации о конкретном товаре.

**Headers:**
```text
Authorization: Bearer <jwt-token>
```
Parameters:
- id (path, integer) - ID товара

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "title": "Rose Plant",
    "price": 29.99,
    "discont_price": 24.99,
    "description": "Beautiful red rose plant for your garden",
    "image": "/images/rose.jpg",
    "categoryId": 1,
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T10:00:00.000Z"
  }
]
```

**Response (200 OK - продукт не найден):**
```json
{
  "status": "ERR",
  "message": "product not found"
}
```

### Create Product (Admin Only)
**POST** `/products`

Создание нового товара. Требуются права администратора.

**Headers:**
```text
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

**Request:**
```json
{
  "title": "New Garden Tool",
  "price": 19.99,
  "discont_price": 15.99,
  "description": "Brand new gardening tool set",
  "image": "https://example.com/tool.jpg",
  "categoryId": 2
}
```

**Response (201 Created):**
```json
{
  "id": 3,
  "title": "New Garden Tool",
  "price": 19.99,
  "discont_price": 15.99,
  "description": "Brand new gardening tool set",
  "image": "https://example.com/tool.jpg",
  "categoryId": 2,
  "createdAt": "2024-01-15T11:00:00.000Z",
  "updatedAt": "2024-01-15T11:00:00.000Z"
}
```

**Response (403 Forbidden):**
```json
{
  "error": "Admin access required"
}
```

## Orders
### Create Order
**POST** `/orders`

Создание нового заказа.

**Headers:**
```text
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

**Request:**
```json
{
  "items": [
    {
      "productId": 1,
      "productTitle": "Rose Plant",
      "price": 24.99,
      "quantity": 2
    },
    {
      "productId": 2,
      "productTitle": "Gardening Shovel",
      "price": 15.99,
      "quantity": 1
    }
  ],
  "total": 65.97,
  "address": "123 Main Street, Apt 4B, New York, NY 10001",
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "+1 (555) 123-4567"
}
```

**Response (201 Created):**
```json
{
  "orderId": 123,
  "status": "created"
}
```

**Response (400 Bad Request):**
```json
{
  "error": "Order items are required"
}
```

### Get User Orders
**GET** `/orders`

Получение списка заказов текущего пользователя.

**Headers:**
```text
Authorization: Bearer <jwt-token>
```

**Response (200 OK):**
```json
[
  {
    "orderId": 123,
    "items": [
      {
        "productId": 1,
        "productTitle": "Rose Plant",
        "price": 24.99,
        "quantity": 2
      }
    ],
    "total": 49.98,
    "address": "123 Main Street, New York, NY",
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "customerPhone": "+1 (555) 123-4567",
    "status": "created",
    "createdAt": "2024-01-15T10:00:00.000Z"
  }
]
```

## Categories
### Get All Categories
**GET** `/categories/all`

Получение списка всех категорий.

**Headers:**
```text
Authorization: Bearer <jwt-token>
```

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "title": "Plants",
    "image": "/images/plants.jpg",
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T10:00:00.000Z"
  },
  {
    "id": 2,
    "title": "Tools",
    "image": "/images/tools.jpg",
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T10:00:00.000Z"
  }
]
```

### Get Category with Products
**GET** `/categories/:id`

Получение категории с товарами этой категории.

**Headers:**
```text
Authorization: Bearer <jwt-token>
```
**Parameters:**
id (path, integer) - ID категории

**Response (200 OK):**
```json
{
  "category": {
    "id": 1,
    "title": "Plants",
    "image": "/images/plants.jpg"
  },
  "data": [
    {
      "id": 1,
      "title": "Rose Plant",
      "price": 29.99,
      "discont_price": 24.99,
      "description": "Beautiful red rose plant",
      "image": "/images/rose.jpg",
      "categoryId": 1
    }
  ]
}
```

## System
### Health Check
**GET** `/health`

Проверка работоспособности API.

**Response (200 OK):**
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:00:00.000Z",
  "message": "Backend is running successfully!"
}
```
### API Test
**GET** `/test`

Тестовый endpoint для проверки API.

**Response (200 OK):**
```json
{
  "message": "API is working!",
  "endpoints": {
    "auth": {
      "register": "POST /api/auth/register",
      "login": "POST /api/auth/login",
      "me": "GET /api/auth/me"
    },
    "products": {
      "list": "GET /api/products",
      "create": "POST /api/products",
      "get": "GET /api/products/:id"
    }
  }
}
```

## Error Responses
### Common Error Formats

**400 Bad Request:**
```json
{
  "error": "Validation error description"
}
```

**401 Unauthorized:**
```json
{
  "error": "Authentication required"
}
```

**403 Forbidden:**
```json
{
  "error": "Admin access required"
}
```

**404 Not Found:**
```json
{
  "error": "Resource not found"
}
```

**500 Internal Server Error:**
```json
{
  "error": "Internal server error",
  "details": "Additional error information"
}
```

## Authentication Flow
- Register → Create user account
- Login → Get JWT token
- API Requests → Include Authorization: Bearer <token> header
- Token Expiry → Re-authenticate with login endpoint

## Rate Limiting
В текущей версии rate limiting не реализован. Планируется к реализации в будущих версиях.

## Data Types
- ID: Integer, auto-increment
- Price: Decimal (2 decimal places)
- Email: String, unique
- JWT Token: String, expires in 24 hours
- Timestamps: ISO 8601 format
