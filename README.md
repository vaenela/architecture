# E-commerce Application
Полнофункциональное интернет-приложение с React фронтендом и Node.js бэкендом.

## Быстрый старт

### Предварительные требования
- Node.js 18.0.0 или выше
- npm 9.0.0 или выше

### Установка и запуск

#### 1. Клонирование и настройка
```bash
# Клонирование репозитория
git clone https://github.com/vaenela/architecture.git
cd architecture

# Установка зависимостей для обеих частей
npm run install:all
```
#### 2. Запуск в режиме разработки
```bash
# Запуск бэкенда и фронтенда одновременно
npm run dev
```

## Тестовые пользователи
**Администратор:**
- Email: admin@example.com
- Password: admin123

**Обычный пользователь:**
- Зарегистрируйтесь через форму регистрации на сайте

## Структура проекта
```text
architecture/
├── backend/                 # Node.js API сервер
│   ├── routes/             # API маршруты
│   ├── database/           # Модели и конфигурация БД
│   └── middleware/         # Промежуточное ПО
├── frontend/               # React приложение
│   ├── src/
│   │   ├── components/     # React компоненты
│   │   ├── pages/          # Страницы приложения
│   │   ├── stores/         # Redux store
│   │   └── api/            # API клиент
│   └── public/             # Статические файлы
└── docs/                   # Документация
```

## База данных
**Текущая БД:** SQLite (для разработки)
**Файл БД:** backend/database.sqlite

База данных автоматически создается при первом запуске с тестовыми данными:
- 3 категории товаров
- 2 тестовых товара
- Администратор: admin@example.com

### План миграции на PostgreSQL
```bash
-- 1. Создание базы данных
CREATE DATABASE ecommerce

-- 2. Настройка подключения в .env
DATABASE_URL=postgresql://username:password@localhost:5432/ecommerce

-- 3. Миграция данных
pgloader database.sqlite postgresql://username:password@localhost/ecommerce
```
