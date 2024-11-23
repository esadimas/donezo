# Backend Documentation: To-Do List API

## Overview

Backend ini adalah RESTful API untuk aplikasi To-Do List. API ini memungkinkan pengguna untuk membuat, membaca, memperbarui, dan menghapus data To-Do. Backend dibangun menggunakan Node.js, Express.js, dan MongoDB (dengan bantuan Mongoose).

## ase URL

- Local Development: http://localhost:3000
- Production (contoh): https://your-api-domain.com

## Endpoints

1. Get All To-Dos

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

2. Create a To-Do

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

3. Update a To-Do

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

- Response Example
  ```json
  {
    "_id": "64c9e6b7f2d35c087c8e5a2d",
    "text": "Learn Express.js",
    "completed": true
  }
  ```

4. Delete a To-Do

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
  "error": "Deskripsi error"
}
```


general status code:

- 200 OK: Permintaan berhasil.
- 201 Created: Data berhasil dibuat.
- 400 Bad Request: Data yang dikirim tidak valid.
- 404 Not Found: Data yang diminta tidak ditemukan.
- 500 Internal Server Error: Kesalahan di server.