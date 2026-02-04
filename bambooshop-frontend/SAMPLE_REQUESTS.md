# BambooShop API - Sample Requests

---

## Users Endpoints

### 3. Get All Users

#### Endpoint

```
GET /api/users
```

#### cURL Command

```bash
curl -X GET http://localhost:3000/api/users
```

#### PowerShell Command

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/users" -Method GET | ConvertTo-Json -Depth 10
```

#### Success Response (200 OK)

```json
{
  "success": true,
  "users": [
    {
      "id": "user-id-1",
      "email": "admin@bambooshop.com",
      "name": "Admin User",
      "role": "ADMIN",
      "createdAt": "2026-01-26T10:30:00.000Z",
      "updatedAt": "2026-01-26T10:30:00.000Z"
    }
  ]
}
```

---

### 4. Get User by ID

#### Endpoint

```
GET /api/users/:id
```

#### URL Parameters

- `id` (required): User ID

#### cURL Command

```bash
curl -X GET http://localhost:3000/api/users/user-id-123
```

#### Success Response (200 OK)

```json
{
  "success": true,
  "user": {
    "id": "user-id-123",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "USER",
    "createdAt": "2026-01-26T10:30:00.000Z",
    "updatedAt": "2026-01-26T10:30:00.000Z"
  }
}
```

#### Error Response (404 Not Found)

```json
{
  "success": false,
  "message": "User not found"
}
```

---

### 5. Update User

#### Endpoint

```
PUT /api/users/:id
```

#### URL Parameters

- `id` (required): User ID

#### Request Body

```json
{
  "email": "newemail@example.com",
  "name": "Updated Name",
  "password": "newpassword123",
  "role": "ADMIN"
}
```

**Note:** All fields are optional. Only include fields you want to update.

#### cURL Command

```bash
curl -X PUT http://localhost:3000/api/users/user-id-123 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Name",
    "email": "newemail@example.com"
  }'
```

#### PowerShell Command

```powershell
$body = @{
    name = "Updated Name"
    email = "newemail@example.com"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/users/user-id-123" `
  -Method PUT `
  -ContentType "application/json" `
  -Body $body
```

#### Success Response (200 OK)

```json
{
  "success": true,
  "user": {
    "id": "user-id-123",
    "email": "newemail@example.com",
    "name": "Updated Name",
    "role": "USER",
    "createdAt": "2026-01-26T10:30:00.000Z",
    "updatedAt": "2026-01-26T11:45:00.000Z"
  },
  "message": "User updated successfully"
}
```

---

### 6. Delete User

#### Endpoint

```
DELETE /api/users/:id
```

#### URL Parameters

- `id` (required): User ID

#### cURL Command

```bash
curl -X DELETE http://localhost:3000/api/users/user-id-123
```

#### PowerShell Command

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/users/user-id-123" -Method DELETE
```

#### Success Response (200 OK)

```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

---

## Products Endpoints

### 7. Get All Products (with filters)

#### Endpoint

```
GET /api/products
```

#### Query Parameters (all optional)

- `category` (string): Filter by category (e.g., "Furniture", "Kitchen", "Decor")
- `minPrice` (number): Minimum price
- `maxPrice` (number): Maximum price
- `isActive` (boolean): Filter by active status ("true" or "false")
- `search` (string): Search in name and description

#### cURL Commands

**Get all products:**

```bash
curl -X GET http://localhost:3000/api/products
```

**Filter by category:**

```bash
curl -X GET "http://localhost:3000/api/products?category=Furniture"
```

**Filter by price range:**

```bash
curl -X GET "http://localhost:3000/api/products?minPrice=50&maxPrice=200"
```

**Search products:**

```bash
curl -X GET "http://localhost:3000/api/products?search=bamboo"
```

**Multiple filters:**

```bash
curl -X GET "http://localhost:3000/api/products?category=Kitchen&minPrice=20&maxPrice=100&isActive=true"
```

#### PowerShell Command

```powershell
# Get all products
Invoke-RestMethod -Uri "http://localhost:3000/api/products" -Method GET | ConvertTo-Json -Depth 10

# With filters
Invoke-RestMethod -Uri "http://localhost:3000/api/products?category=Furniture&minPrice=100" -Method GET
```

#### Success Response (200 OK)

```json
{
  "success": true,
  "data": [
    {
      "_id": "65abc123def456789ghi0123",
      "name": "Bamboo Dining Table",
      "description": "Elegant dining table made from sustainable bamboo",
      "price": 499.99,
      "stock": 15,
      "category": "Furniture",
      "imageUrl": "/images/products/bamboo-dining-table.jpg",
      "isActive": true,
      "createdAt": "2026-01-26T10:30:00.000Z",
      "updatedAt": "2026-01-26T10:30:00.000Z"
    }
  ],
  "total": 1
}
```

---

### 8. Create Product

#### Endpoint

```
POST /api/products
```

#### Request Body

```json
{
  "name": "Bamboo Water Bottle",
  "description": "Eco-friendly bamboo water bottle",
  "price": 29.99,
  "stock": 100,
  "category": "Accessories",
  "imageUrl": "/images/products/bamboo-bottle.jpg",
  "isActive": true
}
```

#### Required Fields

- `name` (string)
- `price` (number, >= 0)
- `category` (string)

#### Optional Fields

- `description` (string)
- `stock` (number, default: 0)
- `imageUrl` (string)
- `isActive` (boolean, default: true)

#### cURL Command

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bamboo Water Bottle",
    "description": "Eco-friendly bamboo water bottle",
    "price": 29.99,
    "stock": 100,
    "category": "Accessories",
    "isActive": true
  }'
```

#### PowerShell Command

```powershell
$body = @{
    name = "Bamboo Water Bottle"
    description = "Eco-friendly bamboo water bottle"
    price = 29.99
    stock = 100
    category = "Accessories"
    isActive = $true
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/products" `
  -Method POST `
  -ContentType "application/json" `
  -Body $body
```

#### Success Response (201 Created)

```json
{
  "success": true,
  "data": {
    "_id": "65abc123def456789ghi0124",
    "name": "Bamboo Water Bottle",
    "description": "Eco-friendly bamboo water bottle",
    "price": 29.99,
    "stock": 100,
    "category": "Accessories",
    "imageUrl": null,
    "isActive": true,
    "createdAt": "2026-01-26T12:00:00.000Z",
    "updatedAt": "2026-01-26T12:00:00.000Z"
  },
  "message": "Product created successfully"
}
```

#### Error Responses

**Missing required fields (400):**

```json
{
  "success": false,
  "message": "Name, price, and category are required"
}
```

**Invalid price (400):**

```json
{
  "success": false,
  "message": "Price must be a positive number"
}
```

---

### 9. Get Product by ID

#### Endpoint

```
GET /api/products/:id
```

#### URL Parameters

- `id` (required): MongoDB ObjectId

#### cURL Command

```bash
curl -X GET http://localhost:3000/api/products/65abc123def456789ghi0123
```

#### Success Response (200 OK)

```json
{
  "success": true,
  "data": {
    "_id": "65abc123def456789ghi0123",
    "name": "Bamboo Dining Table",
    "description": "Elegant dining table made from sustainable bamboo",
    "price": 499.99,
    "stock": 15,
    "category": "Furniture",
    "imageUrl": "/images/products/bamboo-dining-table.jpg",
    "isActive": true,
    "createdAt": "2026-01-26T10:30:00.000Z",
    "updatedAt": "2026-01-26T10:30:00.000Z"
  }
}
```

#### Error Responses

**Invalid ID format (400):**

```json
{
  "success": false,
  "message": "Invalid product ID"
}
```

**Product not found (404):**

```json
{
  "success": false,
  "message": "Product not found"
}
```

---

### 10. Update Product

#### Endpoint

```
PUT /api/products/:id
```

#### URL Parameters

- `id` (required): MongoDB ObjectId

#### Request Body (all fields optional)

```json
{
  "name": "Updated Product Name",
  "description": "Updated description",
  "price": 399.99,
  "stock": 20,
  "category": "Furniture",
  "imageUrl": "/images/new-image.jpg",
  "isActive": false
}
```

#### cURL Command

```bash
curl -X PUT http://localhost:3000/api/products/65abc123def456789ghi0123 \
  -H "Content-Type: application/json" \
  -d '{
    "price": 399.99,
    "stock": 20
  }'
```

#### PowerShell Command

```powershell
$body = @{
    price = 399.99
    stock = 20
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/products/65abc123def456789ghi0123" `
  -Method PUT `
  -ContentType "application/json" `
  -Body $body
```

#### Success Response (200 OK)

```json
{
  "success": true,
  "data": {
    "_id": "65abc123def456789ghi0123",
    "name": "Bamboo Dining Table",
    "description": "Elegant dining table made from sustainable bamboo",
    "price": 399.99,
    "stock": 20,
    "category": "Furniture",
    "imageUrl": "/images/products/bamboo-dining-table.jpg",
    "isActive": true,
    "createdAt": "2026-01-26T10:30:00.000Z",
    "updatedAt": "2026-01-26T13:15:00.000Z"
  },
  "message": "Product updated successfully"
}
```

---

### 11. Delete Product

#### Endpoint

```
DELETE /api/products/:id
```

#### URL Parameters

- `id` (required): MongoDB ObjectId

#### cURL Command

```bash
curl -X DELETE http://localhost:3000/api/products/65abc123def456789ghi0123
```

#### PowerShell Command

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/products/65abc123def456789ghi0123" -Method DELETE
```

#### Success Response (200 OK)

```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

---

## Orders Endpoints

### 12. Get All Orders (with filters)

#### Endpoint

```
GET /api/orders
```

#### Query Parameters (all optional)

- `userId` (string): Filter by user ID
- `status` (string): Filter by status (PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED)

#### cURL Commands

**Get all orders:**

```bash
curl -X GET http://localhost:3000/api/orders
```

**Filter by user:**

```bash
curl -X GET "http://localhost:3000/api/orders?userId=user-id-123"
```

**Filter by status:**

```bash
curl -X GET "http://localhost:3000/api/orders?status=PENDING"
```

**Multiple filters:**

```bash
curl -X GET "http://localhost:3000/api/orders?userId=user-id-123&status=SHIPPED"
```

#### PowerShell Command

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/orders" -Method GET | ConvertTo-Json -Depth 10

# With filters
Invoke-RestMethod -Uri "http://localhost:3000/api/orders?status=PENDING" -Method GET
```

#### Success Response (200 OK)

```json
{
  "success": true,
  "data": [
    {
      "id": "order-id-123",
      "userId": "user-id-456",
      "userName": "John Doe",
      "userEmail": "john@example.com",
      "orderItems": [
        {
          "id": "item-id-1",
          "productId": "product-id-789",
          "productName": "Bamboo Cutting Board Set",
          "quantity": 2,
          "price": 34.99
        }
      ],
      "totalAmount": 69.98,
      "status": "PENDING",
      "shippingAddress": "123 Main St, New York, NY 10001",
      "paymentMethod": "Credit Card",
      "notes": "Please deliver in the morning",
      "createdAt": "2026-01-26T10:30:00.000Z",
      "updatedAt": "2026-01-26T10:30:00.000Z"
    }
  ],
  "total": 1
}
```

---

### 13. Create Order

#### Endpoint

```
POST /api/orders
```

#### Request Body

```json
{
  "userId": "user-id-123",
  "items": [
    {
      "productId": "product-id-456",
      "quantity": 2,
      "price": 34.99
    },
    {
      "productId": "product-id-789",
      "quantity": 1,
      "price": 24.99
    }
  ],
  "shippingAddress": "123 Main St, New York, NY 10001",
  "paymentMethod": "Credit Card",
  "notes": "Please deliver before 5 PM"
}
```

#### Required Fields

- `userId` (string)
- `items` (array, min 1 item)
  - `productId` (string)
  - `quantity` (number)
  - `price` (number)

#### Optional Fields

- `shippingAddress` (string)
- `paymentMethod` (string)
- `notes` (string)

#### Automatic Processing

- ✅ Validates user exists
- ✅ Validates all products exist
- ✅ Checks stock availability
- ✅ Calculates total amount automatically
- ✅ Decreases product stock
- ✅ Sets initial status to PENDING

#### cURL Command

```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user-id-123",
    "items": [
      {
        "productId": "product-id-456",
        "quantity": 2,
        "price": 34.99
      }
    ],
    "shippingAddress": "123 Main St, New York, NY 10001",
    "paymentMethod": "Credit Card"
  }'
```

#### PowerShell Command

```powershell
$body = @{
    userId = "user-id-123"
    items = @(
        @{
            productId = "product-id-456"
            quantity = 2
            price = 34.99
        }
    )
    shippingAddress = "123 Main St, New York, NY 10001"
    paymentMethod = "Credit Card"
} | ConvertTo-Json -Depth 10

Invoke-RestMethod -Uri "http://localhost:3000/api/orders" `
  -Method POST `
  -ContentType "application/json" `
  -Body $body
```

#### Success Response (201 Created)

```json
{
  "success": true,
  "data": {
    "id": "order-id-123",
    "userId": "user-id-456",
    "userName": "John Doe",
    "userEmail": "john@example.com",
    "orderItems": [
      {
        "id": "item-id-1",
        "productId": "product-id-456",
        "productName": "Bamboo Cutting Board Set",
        "quantity": 2,
        "price": 34.99
      }
    ],
    "totalAmount": 69.98,
    "status": "PENDING",
    "shippingAddress": "123 Main St, New York, NY 10001",
    "paymentMethod": "Credit Card",
    "notes": null,
    "createdAt": "2026-01-26T14:00:00.000Z",
    "updatedAt": "2026-01-26T14:00:00.000Z"
  },
  "message": "Order created successfully"
}
```

#### Error Responses

**User not found (404):**

```json
{
  "success": false,
  "message": "User not found"
}
```

**Product not found (404):**

```json
{
  "success": false,
  "message": "Product product-id-456 not found"
}
```

**Insufficient stock (400):**

```json
{
  "success": false,
  "message": "Insufficient stock for product: Bamboo Cutting Board Set"
}
```

**Missing required fields (400):**

```json
{
  "success": false,
  "message": "User ID and items are required"
}
```

---

### 14. Get Order by ID

#### Endpoint

```
GET /api/orders/:id
```

#### URL Parameters

- `id` (required): Order ID

#### cURL Command

```bash
curl -X GET http://localhost:3000/api/orders/order-id-123
```

#### Success Response (200 OK)

```json
{
  "success": true,
  "data": {
    "id": "order-id-123",
    "userId": "user-id-456",
    "userName": "John Doe",
    "userEmail": "john@example.com",
    "orderItems": [
      {
        "id": "item-id-1",
        "productId": "product-id-789",
        "productName": "Bamboo Cutting Board Set",
        "quantity": 2,
        "price": 34.99
      }
    ],
    "totalAmount": 69.98,
    "status": "PENDING",
    "shippingAddress": "123 Main St, New York, NY 10001",
    "paymentMethod": "Credit Card",
    "notes": "Please deliver in the morning",
    "createdAt": "2026-01-26T10:30:00.000Z",
    "updatedAt": "2026-01-26T10:30:00.000Z"
  }
}
```

---

### 15. Update Order

#### Endpoint

```
PUT /api/orders/:id
```

#### URL Parameters

- `id` (required): Order ID

#### Request Body (all fields optional)

```json
{
  "status": "SHIPPED",
  "shippingAddress": "Updated address",
  "paymentMethod": "PayPal",
  "notes": "Updated notes"
}
```

#### Valid Status Values

- `PENDING`
- `PROCESSING`
- `SHIPPED`
- `DELIVERED`
- `CANCELLED`

#### cURL Command

```bash
curl -X PUT http://localhost:3000/api/orders/order-id-123 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "SHIPPED"
  }'
```

#### PowerShell Command

```powershell
$body = @{
    status = "SHIPPED"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/orders/order-id-123" `
  -Method PUT `
  -ContentType "application/json" `
  -Body $body
```

#### Success Response (200 OK)

```json
{
  "success": true,
  "data": {
    "id": "order-id-123",
    "userId": "user-id-456",
    "userName": "John Doe",
    "userEmail": "john@example.com",
    "orderItems": [...],
    "totalAmount": 69.98,
    "status": "SHIPPED",
    "shippingAddress": "123 Main St, New York, NY 10001",
    "paymentMethod": "Credit Card",
    "notes": "Please deliver in the morning",
    "createdAt": "2026-01-26T10:30:00.000Z",
    "updatedAt": "2026-01-26T15:00:00.000Z"
  },
  "message": "Order updated successfully"
}
```

#### Error Response (400 Bad Request)

```json
{
  "success": false,
  "message": "Invalid status. Must be one of: PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED"
}
```

---

### 16. Delete Order

#### Endpoint

```
DELETE /api/orders/:id
```

#### URL Parameters

- `id` (required): Order ID

#### Important Notes

- ⚠️ Only orders with status **PENDING** can be deleted
- ✅ Automatically restores product stock when deleted
- ℹ️ For other statuses, use PUT to update status to CANCELLED

#### cURL Command

```bash
curl -X DELETE http://localhost:3000/api/orders/order-id-123
```

#### PowerShell Command

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/orders/order-id-123" -Method DELETE
```

#### Success Response (200 OK)

```json
{
  "success": true,
  "message": "Order deleted successfully"
}
```

#### Error Response - Not Pending (400)

```json
{
  "success": false,
  "message": "Only pending orders can be deleted. Use status update to cancel other orders."
}
```

---

## Complete API Summary

| Method             | Endpoint             | Description                     | Auth Required |
| ------------------ | -------------------- | ------------------------------- | ------------- |
| **Authentication** |
| POST               | `/api/auth/register` | Register new user               | No            |
| POST               | `/api/auth/login`    | Login user                      | No            |
| **Users**          |
| GET                | `/api/users`         | Get all users                   | Yes\*         |
| POST               | `/api/users`         | Create user                     | Yes\*         |
| GET                | `/api/users/:id`     | Get user by ID                  | Yes\*         |
| PUT                | `/api/users/:id`     | Update user                     | Yes\*         |
| DELETE             | `/api/users/:id`     | Delete user                     | Yes\*         |
| **Products**       |
| GET                | `/api/products`      | Get all products (with filters) | No            |
| POST               | `/api/products`      | Create product                  | Yes\*         |
| GET                | `/api/products/:id`  | Get product by ID               | No            |
| PUT                | `/api/products/:id`  | Update product                  | Yes\*         |
| DELETE             | `/api/products/:id`  | Delete product                  | Yes\*         |
| **Orders**         |
| GET                | `/api/orders`        | Get all orders (with filters)   | Yes\*         |
| POST               | `/api/orders`        | Create order                    | Yes           |
| GET                | `/api/orders/:id`    | Get order by ID                 | Yes           |
| PUT                | `/api/orders/:id`    | Update order                    | Yes\*         |
| DELETE             | `/api/orders/:id`    | Delete order (PENDING only)     | Yes\*         |

**Note:** _Auth Required marked with _ will be implemented with authentication middleware in future updates.

---

## Common Error Responses

### 400 Bad Request

```json
{
  "success": false,
  "message": "Validation error message here"
}
```

### 401 Unauthorized

```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

### 404 Not Found

```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 409 Conflict

```json
{
  "success": false,
  "message": "Resource already exists"
}
```

### 500 Internal Server Error

```json
{
  "success": false,
  "message": "Internal server error"
}
```
