# 🚀 Mini POS System with High-Concurrency & Analytics (Django + React)

## 📌 Project Overview

This project is a full-stack Point of Sale (POS) system built using **Django (Backend)** and **React (Frontend)**.
It demonstrates solutions for:

* High-concurrency stock management (Flash Sale scenario)
* Big data aggregation & query optimization (100k+ records)
* Transaction-safe POS system with rollback support

---

# ⚙️ Tech Stack

### Backend

* Django
* Django REST Framework
* MySQL / SQLite
* ORM Aggregations

### Frontend

* React (Vite)
* Axios

---

# 🧪 Challenge 01: High-Concurrency Management

## ✅ Implementation

* Created API: `POST /api/purchase/`
* Used `transaction.atomic()` to ensure transactional safety
* Used `select_for_update()` to lock rows during concurrent access

## 🔥 Result

* Prevents overselling
* Stock never drops below zero
* Handles 100+ concurrent requests safely

## ▶️ Run Load Test

```bash
python test_requests.py
```

✔ Expected:

* ~50 success responses
* Remaining → "Out of stock"

---

# 📊 Challenge 02: Big Data Aggregation & Optimization

## ✅ Data Population

Script generates:

* 100,000+ Orders
* Random OrderItems
* Data distributed across last 6 months

### ▶️ Run Script

```bash
python manage.py shell
exec(open("pos_backend/dummy_transaction.py").read())
```

---

## ✅ Analytics API

Endpoint:

```
GET /api/analytics/
```

### Returns:

* Daily revenue (last 30 days)
* Top 5 selling products

### 🔥 Optimization Techniques

* Used `annotate()` and `Sum()` for aggregation
* Filtered only required date range
* Avoided Python loops over large datasets
* Leveraged database-level computation

### ⚡ Performance

* Response time under **500ms** for 100k records

---

# 🛒 Challenge 03: Mini POS System

## 🎯 Features

### Frontend (React)

* Product listing
* Add to cart
* Quantity update
* Real-time total calculation
* Checkout system

### Backend

* API: `POST /api/checkout/`
* Accepts full cart payload

---

## 🔐 Transaction Integrity

* Used `transaction.atomic()`
* If any item fails:

  * Entire order is rolled back ❌

✔ Ensures data consistency
✔ Prevents partial order creation

---

## 🧾 Receipt Component (Bonus)

* Styled for **80mm thermal printer width**
* Displays:

  * Product name
  * Quantity
  * Price
  * Total
  * Order ID

---

# 🛠️ Setup Instructions

## 🔹 Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
```

### Database Migration

```bash
python manage.py makemigrations
python manage.py migrate
```

### Run Server

```bash
python manage.py runserver
```

---

## 🔹 Frontend Setup

```bash
cd pos-frontend
npm install
npm run dev
```

---

# 🔗 API Endpoints

| Method | Endpoint        | Description            |
| ------ | --------------- | ---------------------- |
| POST   | /api/purchase/  | Flash sale purchase    |
| GET    | /api/analytics/ | Revenue & top products |
| POST   | /api/checkout/  | POS checkout           |

---

# 🧠 Key Design Decisions

## 🔥 Concurrency Handling

* Row-level locking using `select_for_update()`
* Ensures no race conditions

---

## ⚡ Query Optimization

* Database-level aggregation
* Reduced data processing in Python
* Efficient filtering (last 30 days only)

---

## 🛡️ Transaction Safety

* Full rollback using `transaction.atomic()`
* Prevents inconsistent states

---

# 📈 Outcome

✔ High-performance backend
✔ Scalable architecture
✔ Real-world POS workflow
✔ Clean separation of frontend & backend

---

# 📎 Repository Structure

```text
backend/
  ├── pos_backend/
  ├── manage.py

pos-frontend/
  ├── src/
  ├── components/
```

---

# 📬 Submission

GitHub Repository Link: *(Add your repo link here)*

---

# 🙌 Author

Developed as part of a full-stack system design challenge focusing on concurrency, performance, and transactional integrity.
