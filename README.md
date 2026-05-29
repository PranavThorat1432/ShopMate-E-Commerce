# 🛒 ShopMate E-Commerce Platform

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-ISC-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-19.2.4-61DAFB.svg)

*A modern, full-stack e-commerce solution built with MERN stack, featuring AI-powered product search, real-time analytics, and seamless payment integration.*



</div>

---

## 🌟 Overview

**ShopMate** is a comprehensive, production-ready e-commerce platform designed for scalability and performance. Built with the ERN (PostgreSQL, Express, React, Node.js) architecture, it provides a complete shopping experience for customers and a powerful administrative dashboard for store management.

### Key Highlights

- **Full-Stack Architecture**: Complete separation of concerns with dedicated Client, Admin Dashboard, and Server components
- **AI-Powered Search**: Intelligent product filtering and recommendations using advanced algorithms
- **Real-Time Analytics**: Comprehensive dashboard with live sales metrics, user statistics, and inventory management
- **Secure Payments**: Stripe integration with webhook handling for seamless transaction processing
- **Role-Based Access Control**: Granular permissions for Admin and User roles
- **Cloud Storage**: Cloudinary integration for efficient image management
- **Responsive Design**: Mobile-first approach with Tailwind CSS for optimal user experience across devices

---

## 🛠️ Tech Stack & Tools

### Backend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | >= 18.0.0 | JavaScript Runtime |
| **Express.js** | 5.2.1 | Web Framework |
| **PostgreSQL** | 8.18.0 | Database (via pg) |
| **JWT** | 9.0.3 | Authentication |
| **Bcrypt** | 6.0.0 | Password Hashing |
| **Stripe** | 20.3.1 | Payment Processing |
| **Cloudinary** | 2.9.0 | Cloud Image Storage |
| **Nodemailer** | 8.0.1 | Email Services |
| **Dotenv** | 17.2.4 | Environment Variables |

### Frontend Technologies (Client)

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.2.4 | UI Framework |
| **Vite** | 7.3.1 | Build Tool |
| **Redux Toolkit** | 2.11.2 | State Management |
| **React Router** | 7.13.1 | Routing |
| **Tailwind CSS** | 4.2.1 | Styling |
| **Axios** | 1.13.6 | HTTP Client |
| **Stripe JS** | 8.8.0 | Payment Frontend |
| **Lucide React** | 0.575.0 | Icons |

### Frontend Technologies (Admin Dashboard)

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.2.4 | UI Framework |
| **Vite** | 7.3.1 | Build Tool |
| **Redux Toolkit** | 2.11.2 | State Management |
| **Recharts** | 3.8.0 | Data Visualization |
| **Tailwind CSS** | 4.2.1 | Styling |
| **Axios** | 1.13.6 | HTTP Client |

### Development Tools

- **Nodemon**: Hot-reloading for development
- **ESLint**: Code linting and quality assurance
- **Git**: Version control

---

## ✨ Features

### Customer Features

- **🔐 Authentication System**
  - User registration with email verification
  - Secure login with JWT tokens
  - Password reset functionality via email
  - Profile management and updates

- **🛍️ Product Browsing**
  - Advanced product filtering by category, price, ratings
  - AI-powered smart search and recommendations
  - Detailed product pages with images and reviews
  - Real-time stock availability

- **🛒 Shopping Cart**
  - Add/remove products from cart
  - Quantity adjustment
  - Real-time price calculation
  - Persistent cart state

- **💳 Secure Payments**
  - Stripe integration for credit/debit card payments
  - Secure payment processing
  - Order confirmation and tracking
  - Payment history

- **📦 Order Management**
  - Order placement and tracking
  - Order history with status updates
  - Shipping information management

- **📝 Product Reviews**
  - Submit product reviews and ratings
  - View customer feedback
  - Delete own reviews

### Admin Features

- **📊 Dashboard Analytics**
  - Real-time sales metrics and revenue tracking
  - User statistics and growth analytics
  - Order status monitoring
  - Monthly sales charts and trends
  - Top-selling products analysis
  - Low stock alerts

- **👥 User Management**
  - View all registered users
  - Delete user accounts
  - User activity monitoring
  - Pagination for large user lists

- **📦 Product Management**
  - Create new products with images
  - Update product details and pricing
  - Delete products
  - Manage product inventory
  - View and manage product reviews

- **📋 Order Management**
  - View all orders with details
  - Update order status (Processing, Shipped, Delivered, Cancelled)
  - Order analytics and reporting
  - Customer order history

- **👤 Admin Profile**
  - Update admin profile information
  - Change password
  - Manage account settings

### Technical Features

- **🔒 Security**
  - JWT-based authentication
  - Password hashing with Bcrypt
  - Role-based access control (RBAC)
  - CORS configuration
  - SQL injection prevention
  - XSS protection

- **⚡ Performance**
  - Optimized database queries
  - Image optimization via Cloudinary
  - Lazy loading for better performance
  - Code splitting with Vite

- **🎨 UI/UX**
  - Responsive design for all devices
  - Modern, clean interface
  - Smooth animations and transitions
  - Dark/Light theme support (Client)
  - Intuitive navigation

---

## 🎬 Project Preview

### Client Application

- **Home Page**: Featured products, categories, promotions
- **Product Listing**: Filterable product grid with search
- **Product Detail**: Comprehensive product information with reviews
- **Shopping Cart**: Real-time cart management
- **Checkout**: Secure payment processing with Stripe
- **User Dashboard**: Order history, profile management

### Admin Dashboard

- **Overview Panel**: Key metrics and statistics
- **Analytics Charts**: Revenue trends, order patterns
- **User Management**: Comprehensive user administration
- **Product Management**: Full CRUD operations for products
- **Order Management**: Order processing and tracking
- **Profile Settings**: Admin account management

---

## 🏗️ Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Application                        │
│                   (React + Vite + Redux)                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Pages   │  │Components│  │  Redux   │  │  Utils   │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/REST API
                              │
┌─────────────────────────────────────────────────────────────┐
│                    Admin Dashboard                            │
│                 (React + Vite + Redux + Recharts)            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Pages   │  │Components│  │  Redux   │  │  Utils   │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/REST API
                              │
┌─────────────────────────────────────────────────────────────┐
│                      Backend Server                           │
│                    (Express + Node.js)                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ Routes   │  │Controllers│ │ Middlewares│ │  Utils   │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              │
┌─────────────────────────────────────────────────────────────┐
│                    PostgreSQL Database                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Users   │  │ Products │  │  Orders  │  │ Payments │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              │
┌─────────────────────────────────────────────────────────────┐
│                   External Services                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                  │
│  │ Cloudinary│  │  Stripe  │  │Nodemailer │                  │
│  └──────────┘  └──────────┘  └──────────┘                  │
└─────────────────────────────────────────────────────────────┘
```

### Database Schema

**Users Table**
- `id` (UUID, Primary Key)
- `name` (VARCHAR)
- `email` (VARCHAR, Unique)
- `password` (TEXT, Hashed)
- `role` (VARCHAR: User/Admin)
- `avatar` (JSONB)
- `reset_password_token` (TEXT)
- `reset_password_expire` (TIMESTAMP)
- `created_at` (TIMESTAMP)

**Products Table**
- `id` (UUID, Primary Key)
- `name` (VARCHAR)
- `description` (TEXT)
- `price` (DECIMAL)
- `stock` (INTEGER)
- `category` (VARCHAR)
- `images` (JSONB)
- `ratings` (DECIMAL)
- `created_at` (TIMESTAMP)

**Orders Table**
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key)
- `shipping_info` (JSONB)
- `order_status` (VARCHAR)
- `total_price` (DECIMAL)
- `paid_at` (TIMESTAMP)
- `created_at` (TIMESTAMP)
 
**Order Items Table**
- `id` (UUID, Primary Key)
- `order_id` (UUID, Foreign Key)
- `product_id` (UUID, Foreign Key)
- `quantity` (INTEGER)
- `price` (DECIMAL)

**Payments Table**
- `id` (UUID, Primary Key)
- `order_id` (UUID, Foreign Key)
- `payment_intent_id` (TEXT)
- `payment_status` (VARCHAR)
- `amount` (DECIMAL)
- `created_at` (TIMESTAMP)

---

## ⚡ Quick Start

### Prerequisites

- Node.js (>= 18.0.0)
- PostgreSQL (>= 13.0)
- npm or yarn
- Git

### Installation Steps

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/ShopMate-E-Commerce.git
cd ShopMate-E-Commerce
```

2. **Install dependencies for all components**
```bash
# Server dependencies
cd Server
npm install

# Client dependencies
cd ../Client
npm install

# Admin Dashboard dependencies
cd ../Dashboard\ \(Admin\)
npm install
```

3. **Configure environment variables**

Create `.env` file in the Server directory:
```env
PORT=3000
DB_PASS=your_postgresql_password
FRONTEND_URL=http://localhost:5173
DASHBOARD_URL=http://localhost:5174
JWT_SECRET_KEY=your_jwt_secret_key
CLOUDINARY_CLIENT_NAME=your_cloudinary_name
CLOUDINARY_CLIENT_API=your_cloudinary_api_key
CLOUDINARY_CLIENT_SECRET=your_cloudinary_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

4. **Setup PostgreSQL database**
```sql
CREATE DATABASE ShopMate_Ecommerce;
```

5. **Start the development servers**

Terminal 1 - Server:
```bash
cd Server
npm run dev
```

Terminal 2 - Client:
```bash
cd Client
npm run dev
```

Terminal 3 - Admin Dashboard:
```bash
cd "Dashboard (Admin)"
npm run dev
```

6. **Access the applications**
- Client: http://localhost:5173
- Admin Dashboard: http://localhost:5174
- API: http://localhost:3000

---

## 📦 Installation

### Detailed Installation Guide

#### 1. System Requirements

Ensure your system meets the following requirements:
- **Operating System**: Windows, macOS, or Linux
- **Node.js**: Version 18.0.0 or higher
- **PostgreSQL**: Version 13.0 or higher
- **npm**: Version 9.0.0 or higher (comes with Node.js)
- **Git**: For version control

#### 2. Database Setup

**Install PostgreSQL**
- Windows: Download from [postgresql.org](https://www.postgresql.org/download/)
- macOS: `brew install postgresql`
- Linux: `sudo apt-get install postgresql postgresql-contrib`

**Create Database**
```bash
# Start PostgreSQL service
sudo service postgresql start

# Login to PostgreSQL
sudo -u postgres psql

# Create database
CREATE DATABASE ShopMate_Ecommerce;

# Create user (optional)
CREATE USER shopmate WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE ShopMate_Ecommerce TO shopmate;

# Exit
\q
```

#### 3. External Services Setup

**Cloudinary Setup**
1. Sign up at [cloudinary.com](https://cloudinary.com/)
2. Create an account and get your API credentials
3. Note down: Cloud Name, API Key, API Secret

**Stripe Setup**
1. Sign up at [stripe.com](https://stripe.com/)
2. Get your API keys from the Dashboard
3. Set up webhook endpoint for payment confirmation
4. Note down: Secret Key, Publishable Key, Webhook Secret

#### 4. Project Configuration

**Server Environment Variables**
Create `.env` file in `Server/` directory:
```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_PASS=your_postgresql_password

# Frontend URLs
FRONTEND_URL=http://localhost:5173
DASHBOARD_URL=http://localhost:5174

# JWT Configuration
JWT_SECRET_KEY=your_super_secret_jwt_key_min_32_chars

# Cloudinary Configuration
CLOUDINARY_CLIENT_NAME=your_cloud_name
CLOUDINARY_CLIENT_API=your_api_key
CLOUDINARY_CLIENT_SECRET=your_api_secret

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

**Client Environment Variables**
Create `.env` file in `Client/` directory:
```env
VITE_API_URL=http://localhost:3000
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
VITE_FRONTEND_URL=http://localhost:5173
```

**Admin Dashboard Environment Variables**
Create `.env` file in `Dashboard (Admin)/` directory:
```env
VITE_API_URL=http://localhost:3000
VITE_FRONTEND_URL=http://localhost:5174
```

---

## ⚙️ Configuration

### Server Configuration

**Database Connection** (`Server/Config/db.js`)
```javascript
const database = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'ShopMate_Ecommerce',
    password: process.env.DB_PASS,
    port: 5432,
});
```

**CORS Configuration** (`Server/app.js`)
```javascript
app.use(cors({
    origin: [
        process.env.FRONTEND_URL || 'http://localhost:5173',
        process.env.DASHBOARD_URL || 'http://localhost:5174'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
```

### Client Configuration

**API Base URL** (`Client/lib/axios.js`)
```javascript
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    withCredentials: true,
});
```

### Admin Dashboard Configuration

**API Base URL** (`Dashboard (Admin)/lib/axios.js`)
```javascript
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    withCredentials: true,
});
```

---

## 🎯 Usage

### For Customers

1. **Registration**
   - Click on "Sign Up" in the login modal
   - Fill in your name, email, and password
   - Submit the form to create your account

2. **Browsing Products**
   - Navigate to the Products page
   - Use filters to narrow down by category, price, ratings
   - Use the search bar to find specific products
   - Click on products to view details

3. **Shopping Cart**
   - Add products to cart from product pages
   - Click on cart icon to view cart
   - Adjust quantities or remove items
   - Proceed to checkout when ready

4. **Checkout**
   - Review your order in the cart
   - Click "Proceed to Checkout"
   - Enter shipping information
   - Complete payment using Stripe
   - Receive order confirmation

5. **Order Tracking**
   - Navigate to Orders page
   - View order history and status
   - Track order progress

### For Administrators

1. **Login**
   - Access the admin dashboard at `/login`
   - Enter admin credentials
   - Only users with Admin role can access

2. **Dashboard Overview**
   - View key metrics: revenue, users, orders
   - Analyze sales trends and charts
   - Monitor low stock alerts

3. **Product Management**
   - Create new products with images
   - Update existing product information
   - Delete products
   - Manage inventory levels

4. **Order Management**
   - View all customer orders
   - Update order status
   - Monitor order fulfillment

5. **User Management**
   - View registered users
   - Delete user accounts if needed
   - Monitor user activity

---

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication Endpoints

#### POST `/auth/register`
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "User"
  }
}
```

#### POST `/auth/login`
Authenticate a user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "User"
  }
}
```

#### GET `/auth/getUser`
Get current authenticated user.

**Headers:**
```
Cookie: token=jwt_token
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "User",
    "avatar": {...}
  }
}
```

#### POST `/auth/logout`
Logout current user.

**Headers:**
```
Cookie: token=jwt_token
```

**Response:**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

#### POST `/auth/password/forgot-password`
Request password reset email.

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset email sent"
}
```

#### PUT `/auth/password/reset/:token`
Reset password with token.

**Request Body:**
```json
{
  "password": "newpassword123",
  "confirmPassword": "newpassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset successful",
  "user": {...}
}
```

### Product Endpoints

#### GET `/products`
Get all products with filters.

**Query Parameters:**
- `category`: Filter by category
- `price`: Price range (e.g., "0-1000")
- `search`: Search query
- `ratings`: Minimum rating
- `availability`: Stock status
- `page`: Page number for pagination

**Response:**
```json
{
  "success": true,
  "products": [...],
  "totalProducts": 100,
  "currentPage": 1,
  "totalPages": 10
}
```

#### GET `/products/single-product/:productId`
Get single product details.

**Response:**
```json
{
  "success": true,
  "product": {
    "id": "uuid",
    "name": "Product Name",
    "description": "...",
    "price": 99.99,
    "stock": 50,
    "category": "Electronics",
    "images": [...],
    "ratings": 4.5
  }
}
```

#### POST `/products/admin/create-product` (Admin Only)
Create a new product.

**Headers:**
```
Cookie: token=jwt_token
Content-Type: multipart/form-data
```

**Request Body:**
```json
{
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "stock": 50,
  "category": "Electronics",
  "images": [file1, file2]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Product created successfully",
  "product": {...}
}
```

#### PUT `/products/admin/update-product/:productId` (Admin Only)
Update product details.

**Headers:**
```
Cookie: token=jwt_token
Content-Type: multipart/form-data
```

**Response:**
```json
{
  "success": true,
  "message": "Product updated successfully",
  "product": {...}
}
```

#### DELETE `/products/admin/delete-product/:productId` (Admin Only)
Delete a product.

**Headers:**
```
Cookie: token=jwt_token
```

**Response:**
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

#### PUT `/products/post-review/:productId`
Post a product review.

**Headers:**
```
Cookie: token=jwt_token
```

**Request Body:**
```json
{
  "rating": 5,
  "comment": "Great product!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Review posted successfully"
}
```

#### POST `/products/ai-search`
AI-powered product search.

**Headers:**
```
Cookie: token=jwt_token
```

**Request Body:**
```json
{
  "query": "laptop for gaming",
  "filters": {
    "category": "Electronics",
    "priceRange": "0-2000"
  }
}
```

**Response:**
```json
{
  "success": true,
  "products": [...],
  "recommendations": [...]
}
```

### Order Endpoints

#### POST `/orders/create-order`
Create a new order.

**Headers:**
```
Cookie: token=jwt_token
```

**Request Body:**
```json
{
  "shippingInfo": {
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "country": "USA",
    "pinCode": "10001",
    "phoneNo": "1234567890"
  },
  "orderItems": [
    {
      "productId": "uuid",
      "quantity": 2,
      "price": 99.99
    }
  ],
  "paymentMethod": "Card",
  "paymentInfo": {
    "id": "payment_intent_id"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Order created successfully",
  "order": {...}
}
```

#### GET `/orders/my-orders`
Get current user's orders.

**Headers:**
```
Cookie: token=jwt_token
```

**Response:**
```json
{
  "success": true,
  "orders": [...]
}
```

### Admin Endpoints

#### GET `/admin/get-all-users` (Admin Only)
Get all users with pagination.

**Headers:**
```
Cookie: token=jwt_token
```

**Query Parameters:**
- `page`: Page number

**Response:**
```json
{
  "success": true,
  "users": [...],
  "totalUsers": 50,
  "currentPage": 1
}
```

#### DELETE `/admin/delete-user/:id` (Admin Only)
Delete a user.

**Headers:**
```
Cookie: token=jwt_token
```

**Response:**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

#### GET `/admin/fetch/dashboard-stats` (Admin Only)
Get dashboard statistics.

**Headers:**
```
Cookie: token=jwt_token
```

**Response:**
```json
{
  "success": true,
  "message": "Dashboard Stats Fetched!",
  "totalRevenueAllTime": 50000,
  "todayRevenue": 1000,
  "yesterdayRevenue": 800,
  "totalUsersCount": 100,
  "orderStatusCounts": {
    "Processing": 5,
    "Shipped": 10,
    "Delivered": 50,
    "Cancelled": 2
  },
  "monthlySales": [...],
  "currentMonthSales": 5000,
  "topProducts": [...],
  "lowStockProducts": [...],
  "revenueGrowth": "+25.00%",
  "newUsersThisMonth": 10
}
```

---

## 🎨 UI/UX Features

### Design Principles

- **Minimalist Design**: Clean, clutter-free interface focusing on content
- **Consistent Branding**: Unified color scheme and typography across all components
- **Accessibility**: WCAG 2.1 compliant with proper contrast ratios and keyboard navigation
- **Responsive**: Mobile-first approach ensuring optimal experience on all devices
- **Performance**: Optimized loading times and smooth interactions

### Color Palette

**Client Application**
- Primary: Blue (#3B82F6)
- Secondary: Purple (#8B5CF6)
- Accent: Green (#10B981)
- Background: Light (#F8FAFC)
- Text: Dark (#1E293B)

**Admin Dashboard**
- Primary: Blue (#2563EB)
- Success: Green (#16A34A)
- Warning: Orange (#F59E0B)
- Danger: Red (#DC2626)
- Background: White (#FFFFFF)
- Sidebar: Dark (#1E293B)

### Typography

- **Headings**: Inter/San-serif, bold weights
- **Body**: Inter/San-serif, regular weights
- **Code**: Monospace for technical content

### Interactive Elements

- **Hover Effects**: Smooth transitions on buttons and links
- **Loading States**: Skeleton loaders and spinners during data fetching
- **Toast Notifications**: Non-intrusive alerts for user feedback
- **Modals**: Clean overlay dialogs for forms and confirmations
- **Animations**: Subtle micro-interactions for enhanced UX

### Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

---

## 📁 Project Structure

```
ShopMate-E-Commerce/
│
├── Client/                          # Customer-facing application
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── Components/              # Reusable components
│   │   │   ├── Home/               # Home page components
│   │   │   ├── Layout/             # Layout components (Navbar, Footer, etc.)
│   │   │   ├── Products/           # Product-related components
│   │   │   └── PaymentForm.jsx     # Payment form component
│   │   ├── Context/                # React Context providers
│   │   │   └── ThemeContext.jsx    # Theme management
│   │   ├── Data/                   # Static data
│   │   ├── Pages/                  # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Orders.jsx
│   │   │   ├── Payment.jsx
│   │   │   ├── About.jsx
│   │   │   ├── FAQ.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── NotFound.jsx
│   │   ├── Redux/                  # Redux store and slices
│   │   │   ├── authSlice.js        # Authentication state
│   │   │   ├── productSlice.js     # Product state
│   │   │   ├── cartSlice.js        # Cart state
│   │   │   └── PopupSlice.js       # UI popup state
│   │   ├── assets/                 # Images, fonts, etc.
│   │   ├── lib/                    # Utility libraries
│   │   │   └── axios.js            # Axios configuration
│   │   ├── App.jsx                 # Main app component
│   │   ├── main.jsx                # Entry point
│   │   ├── App.css                 # Global styles
│   │   └── index.css               # Tailwind imports
│   ├── index.html                  # HTML template
│   ├── package.json                # Dependencies
│   ├── vite.config.js              # Vite configuration
│   └── tailwind.config.js          # Tailwind configuration
│
├── Dashboard (Admin)/              # Admin dashboard application
│   ├── public/                     # Static assets
│   ├── src/
│   │   ├── components/             # Dashboard components
│   │   │   ├── Dashboard.jsx       # Main dashboard
│   │   │   ├── Header.jsx          # Header component
│   │   │   ├── SideBar.jsx         # Sidebar navigation
│   │   │   ├── Orders.jsx          # Orders management
│   │   │   ├── Products.jsx        # Products management
│   │   │   ├── Profile.jsx         # Admin profile
│   │   │   ├── Users.jsx           # Users management
│   │   │   ├── dashboard-components/  # Dashboard sub-components
│   │   │   │   ├── Stats.jsx       # Statistics cards
│   │   │   │   ├── MiniSummary.jsx # Summary widgets
│   │   │   │   ├── MonthlySalesChart.jsx
│   │   │   │   ├── OrdersChart.jsx
│   │   │   │   └── TopProductsChart.jsx
│   │   ├── pages/                  # Page components
│   │   │   ├── Login.jsx           # Admin login
│   │   │   ├── ForgotPassword.jsx  # Forgot password
│   │   │   └── ResetPassword.jsx   # Reset password
│   │   ├── store/                  # Redux store
│   │   │   ├── slices/
│   │   │   │   ├── authSlice.js    # Authentication state
│   │   │   │   ├── adminSlice.js   # Admin-specific state
│   │   │   │   ├── productsSlice.js # Products state
│   │   │   │   └── extraSlice.js   # UI state
│   │   │   └── store.js            # Redux store configuration
│   │   ├── assets/                 # Images, fonts, etc.
│   │   ├── lib/                    # Utility libraries
│   │   │   └── axios.js            # Axios configuration
│   │   ├── modals/                 # Modal components
│   │   ├── App.jsx                 # Main app component
│   │   ├── main.jsx                # Entry point
│   │   └── index.css               # Global styles
│   ├── index.html                  # HTML template
│   ├── package.json                # Dependencies
│   └── vite.config.js              # Vite configuration
│
└── Server/                         # Backend API server
    ├── Config/                     # Configuration files
    │   └── db.js                   # Database connection
    ├── Controllers/                # Route controllers
    │   ├── authController.js       # Authentication logic
    │   ├── productController.js    # Product logic
    │   ├── orderController.js      # Order logic
    │   └── adminController.js      # Admin logic
    ├── Middlewares/                # Custom middlewares
    │   ├── isAuth.js               # Authentication middleware
    │   ├── errorMiddlewares.js    # Error handling
    │   └── catchAsyncError.js      # Async error wrapper
    ├── Models/                     # Database models
    │   ├── userTable.js            # Users table schema
    │   ├── productsTable.js       # Products table schema
    │   ├── ordersTable.js          # Orders table schema
    │   ├── orderItemsTable.js      # Order items schema
    │   ├── paymentsTable.js       # Payments table schema
    │   ├── shippinginfoTable.js    # Shipping info schema
    │   └── productReviewsTable.js # Reviews table schema
    ├── Routes/                     # API routes
    │   ├── authRoutes.js           # Auth endpoints
    │   ├── productsRoutes.js       # Product endpoints
    │   ├── orderRoutes.js          # Order endpoints
    │   └── adminRoutes.js          # Admin endpoints
    ├── Utils/                      # Utility functions
    │   ├── createTables.js         # Table creation
    │   ├── sendEmail.js            # Email sending
    │   └── ...                     # Other utilities
    ├── Temp/                       # Temporary file storage
    ├── .env                        # Environment variables
    ├── .gitignore                  # Git ignore rules
    ├── app.js                      # Express app configuration
    ├── server.js                   # Server entry point
    └── package.json                # Dependencies
```

---

## 🧪 Testing

### Testing Strategy

Currently, the project uses manual testing. Here's a comprehensive testing guide:

### Manual Testing Checklist

#### Authentication Testing
- [ ] User registration with valid data
- [ ] User registration with duplicate email
- [ ] User login with correct credentials
- [ ] User login with incorrect credentials
- [ ] Password reset request
- [ ] Password reset with valid token
- [ ] Password reset with invalid token
- [ ] Logout functionality

#### Product Testing
- [ ] View all products
- [ ] Filter products by category
- [ ] Filter products by price range
- [ ] Search products by name
- [ ] View single product details
- [ ] Add product to cart
- [ ] Remove product from cart
- [ ] Update cart quantity
- [ ] Post product review
- [ ] Delete product review

#### Order Testing
- [ ] Create order with valid data
- [ ] Create order with invalid data
- [ ] View order history
- [ ] Track order status
- [ ] Payment processing with Stripe
- [ ] Payment failure handling

#### Admin Testing
- [ ] Admin login
- [ ] View dashboard statistics
- [ ] Create new product
- [ ] Update existing product
- [ ] Delete product
- [ ] View all users
- [ ] Delete user
- [ ] View all orders
- [ ] Update order status
- [ ] Update admin profile

### Future Testing Implementation

Recommended testing frameworks:
- **Jest**: Unit and integration testing
- **React Testing Library**: Component testing
- **Cypress**: End-to-end testing
- **Supertest**: API endpoint testing

---

## 🚀 Deployment

### Deployment Guide

#### Prerequisites
- AWS/GCP/Azure account (or any cloud provider)
- Domain name
- SSL certificate
- PostgreSQL database (cloud-hosted)

#### 1. Database Deployment

**Option A: PostgreSQL on Cloud**
- AWS RDS
- Google Cloud SQL
- Azure Database for PostgreSQL

**Option B: Managed PostgreSQL**
- Supabase
- Neon
- Railway

#### 2. Backend Deployment

**Deploy to Vercel/Heroku/Render:**

```bash
# Build for production
cd Server
npm install

# Set environment variables in deployment platform
# PORT, DB_PASS, JWT_SECRET_KEY, etc.

# Deploy
# Follow platform-specific deployment instructions
```

**Environment Variables for Production:**
```env
PORT=8080
NODE_ENV=production
DB_PASS=production_db_password
FRONTEND_URL=https://yourdomain.com
DASHBOARD_URL=https://admin.yourdomain.com
JWT_SECRET_KEY=strong_production_secret
CLOUDINARY_CLIENT_NAME=your_cloud_name
CLOUDINARY_CLIENT_API=your_api_key
CLOUDINARY_CLIENT_SECRET=your_api_secret
STRIPE_SECRET_KEY=sk_live_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook
```

#### 3. Frontend Deployment (Client)

**Deploy to Vercel:**
```bash
cd Client
npm install
npm run build
# Deploy build/ folder to Vercel
```

**Environment Variables:**
```env
VITE_API_URL=https://your-api-domain.com
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_key
VITE_FRONTEND_URL=https://yourdomain.com
```

#### 4. Admin Dashboard Deployment

**Deploy to Vercel:**
```bash
cd "Dashboard (Admin)"
npm install
npm run build
# Deploy build/ folder to Vercel
```

**Environment Variables:**
```env
VITE_API_URL=https://your-api-domain.com
VITE_FRONTEND_URL=https://admin.yourdomain.com
```

#### 5. Stripe Webhook Configuration

1. Go to Stripe Dashboard
2. Navigate to Webhooks
3. Add endpoint: `https://your-api-domain.com/api/payment/webhook`
4. Select events: `payment_intent.succeeded`
5. Copy webhook secret to environment variables

#### 6. Domain Configuration

- Configure DNS records to point to your deployment
- Set up SSL certificates (usually automatic with Vercel/Netlify)
- Update CORS configuration in backend

#### 7. Performance Optimization

- Enable CDN for static assets
- Configure database connection pooling
- Implement caching strategy (Redis)
- Enable Gzip compression
- Optimize images and assets

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can contribute:

### Contribution Guidelines

1. **Fork the Repository**
   ```bash
   git clone https://github.com/yourusername/ShopMate-E-Commerce.git
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Your Changes**
   - Follow the existing code style
   - Add comments for complex logic
   - Update documentation if needed

4. **Test Your Changes**
   - Ensure all tests pass
   - Test manually on your local environment
   - Check for any breaking changes

5. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

6. **Push to Your Branch**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Submit a Pull Request**
   - Provide a clear description of your changes
   - Reference any related issues
   - Wait for code review

### Code Style Guidelines

- Use ESLint for code linting
- Follow existing naming conventions
- Write meaningful commit messages
- Add comments for complex logic
- Keep functions small and focused

### Reporting Issues

When reporting bugs, please include:
- Description of the issue
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Environment details (OS, Node version, etc.)


---

## 👥 Team & Credits

### Development Team
- **Lead Developer**: Pranav Thorat

### Technologies Used
- React.js
- Node.js
- Express.js
- PostgreSQL
- Stripe
- Cloudinary
- Tailwind CSS

### Acknowledgments
- Open source community
- Stack Overflow community
- Documentation contributors

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.


---

## 📞 Contact & Support

| Platform              | Link                                                          |
| --------------------- | ------------------------------------------------------------- |
| 🧑 **Author**      | Pranav Thorat                      |
| 🌐 **Live Demo**      | [View Now]()                        |
| 🧑‍💻 **GitHub Repo** | [View Code](https://github.com/PranavThorat1432/ShopMate-E-Commerce) |
| 💼 **LinkedIn**       | [Connect with Me](https://www.linkedin.com/in/curiouspranavthorat)       |
| 📩 **Email**          | [pranavthorat95@gmail.com](mailto:pranavthorat95@gmail.com)   |


---

<div align="center">

**⭐ If you find this project helpful, please give it a star!**

**🚀 Happy Learning & Teaching!**

</div>

<div align="center">

**Built with ❤️ by the ShopMate Team**

[⬆ Back to Top](#-shopmate-e-commerce-platform)

</div>
