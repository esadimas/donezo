# Backend Documentation: To-Do List API

## Overview

Backend ini adalah RESTful API untuk aplikasi To-Do List. API ini memungkinkan pengguna untuk membuat, membaca, memperbarui, dan menghapus data To-Do. Backend dibangun menggunakan Node.js, Express.js, dan MongoDB (dengan bantuan Mongoose).

## Base URL

- Local Development: http://localhost:3000
- Production (contoh): https://your-api-domain.com

## Endpoints

### 1. User Registration

- URL: /api/auth/register
- Method: POST
- Description: Mendaftarkan pengguna baru ke dalam sistem.
- Request Body:

  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```

Response:

- 201 Created
  Jika pendaftaran berhasil:

  ```json
  {
    "message": "User registered successfully",
    "user": {
      "id": "64b1f5e...",
      "name": "John Doe",
      "email": "john.doe@example.com"
    }
  }
  ```

- 400 Bad Request
  Jika ada kesalahan validasi:

  ```json
  {
    "error": "Email is already in use"
  }
  ```

### 2. User Login

- URL: POST /api/auth/login
- Method: POST
- Description: Mengautentikasi pengguna dan mengembalikan token untuk akses lebih lanjut.

  Request Body:

  ```json
  {
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```

Response:

- 200 OK
  Jika login berhasil:

  ```json
  {
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "64b1f5e...",
      "name": "John Doe",
      "email": "john.doe@example.com"
    }
  }
  ```

- 401 Unauthorized
  Jika kredensial salah:

  ```json
  {
    "error": "Invalid email or password"
  }
  ```

### 3. Get User Profile

- URL: /api/users/profile
- Method: GET
- Description: Mengambil data profil pengguna berdasarkan token autentikasi. Endpoint ini hanya mengembalikan data pengguna yang sedang login.

Authorization:

- Endpoint ini membutuhkan Bearer Token.
- Token harus dikirim melalui header sebagai berikut:

  ```http
  Authorization: Bearer <token>
  ```

### 4. Get All To-Dos

- URL: /api/todos
- Method: GET
- Description: Mengambil semua data To-Do.
- Response Example:

    ```json
    [
      {
        "_id": "64c9e5b9f2d35c087c8e5a2b",
        "text": "Learn Vue.js",
        "completed": false
      },
      {
        "_id": "64c9e5d4f2d35c087c8e5a2c",
        "text": "Build To-Do App",
        "completed": true
      }
    ]
    ```

  Response:

  - 200 OK
    Jika token valid, mengembalikan data profil pengguna:

    ```json
    {
      "message": "User profile retrieved successfully",
      "user": {
        "id": "64b1f5e...",
        "name": "John Doe",
        "email": "john.doe@example.com",
        "createdAt": "2024-11-24T12:34:56Z"
      }
    }
    ```

  - 401 Unauthorized
    Jika token tidak valid atau tidak ada token:

    ```json
    {
      "error": "Unauthorized access"
    }
    ```

### 5. Create a To-Do

- URL: /api/todos
- Method: POST
- Description: Menambahkan data To-Do baru.
- Request Body:

    ```json
    {
      "text": "Learn Node.js"
    }
    ```

- Response Example:

    ```json
    {
      "_id": "64c9e6b7f2d35c087c8e5a2d",
      "text": "Learn Node.js",
      "completed": false
    }
    ```

### 6. Update a To-Do

- URL: /api/todos/:id
- Method: PUT
- Description: Memperbarui data To-Do berdasarkan ID.
- Request Parameters:
- id (string): ID dari To-Do yang ingin diperbarui.
- Request Body:

    ```json
    {
      "text": "Learn Express.js",
      "completed": true
    }
    ```

- Response Example:

    ```json
    {
      "_id": "64c9e6b7f2d35c087c8e5a2d",
      "text": "Learn Express.js",
      "completed": true
    }
    ```

### 7. Delete a To-Do

- URL: /api/todos/:id
- Method: DELETE
- Description: Menghapus data To-Do berdasarkan ID.
- Request Parameters:
- id (string): ID dari To-Do yang ingin dihapus.
- Response Example:

    ```json
    {
      "message": "Todo deleted"
    }
    ```

## Error Responses

Semua endpoint dapat mengembalikan error dengan format berikut:

  ```json
  {
    "error": "Intenal server error"
  }
  ```

## Validations

Untuk memastikan data yang dikirim pengguna benar, berikut validasi yang diterapkan:

- Register:
  - name: Wajib diisi, minimal 3 karakter.
  - email: Format harus valid, dan tidak boleh sudah terdaftar.
  - password: Wajib diisi, minimal 6 karakter.
- Login:
  - email: Wajib diisi, harus terdaftar.
  - password: Wajib diisi.

## general status code:

- 200 OK: Permintaan berhasil.
- 201 Created: Data berhasil dibuat.
- 400 Bad Request: Data yang dikirim tidak valid.
- 404 Not Found: Data yang diminta tidak ditemukan.
- 500 Internal Server Error: Kesalahan di server.
