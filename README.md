# **Role-Based Authentication Backend**

## **📌 Overview**

This is a **Node.js + Express.js** backend with **MySQL** for role-based authentication. It includes **customer** and **admin** registration, authentication, email verification, and access control.

## **🚀 Features**

✅ **User Registration** (Customer & Admin)  
✅ **Role-Based Access**  
✅ **Email Verification**  
✅ **Admin Login Restriction** (Only admins can log in from the admin panel)

---

## **🛠️ Tech Stack**

- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Email Service:** Nodemailer

---

📡 API Endpoints

POST: /user/registration - Register a new User (Customer or Admin)
POST: /validate/otp - Validate Email OTP
POST: /admin/login - Admin Login

---

## **📂 Project Structure**

```
Assignment
├─ .DS_Store
└─ role-based-auth-backend
   ├─ README.md
   ├─ config
   │  └─ default.json
   ├─ data_access
   │  └─ user.data_access.js
   ├─ error_log.log
   ├─ helper
   │  ├─ email.js
   │  ├─ logger.js
   │  └─ mysql.js
   ├─ index.js
   ├─ package-lock.json
   ├─ package.json
   ├─ routes
   │  └─ user.js
   └─ service
      └─ user.service.js

```
