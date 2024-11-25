const mongoose = require('mongoose');
const Todo = require('../models/todoModel'); 

const seedTodos = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/donezo');

    console.log('Connected to MongoDB.');

    // Hapus semua data sebelumnya
    await Todo.deleteMany({});
    console.log('Existing todos cleared.');

    // Data seed
    const todos = [
      {
        userId: '64c9e5b9f2d35c087c8e5a2b',
        title: 'Learn Vue.js',
        description: 'Belajar dasar-dasar Vue.js dan cara membuat komponen.',
        status: false,
        dueDate: new Date('2030-10-10'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: '64c9e5d4f2d35c087c8e5a2c',
        title: 'Build To-Do App',
        description: 'Membangun aplikasi To-Do sederhana dengan fitur CRUD.',
        status: false,
        dueDate: new Date('2030-11-15'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: '64c9e5b9f2d35c087c8e5a2b',
        title: 'Learn Node.js',
        description: 'Pelajari dasar-dasar backend menggunakan Node.js.',
        status: true,
        dueDate: new Date('2030-12-01'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // data seed ke database
    await Todo.insertMany(todos);
    console.log('Todos seeded successfully.');

    // Tutup koneksi ke database
    mongoose.connection.close();
    console.log('Database connection closed.');
  } catch (error) {
    console.error('Error seeding data:', error);
    mongoose.connection.close();
  }
};

seedTodos();
