const mongoose = require('mongoose');
const User = require('../models/userModel'); 
const bcrypt = require('bcryptjs'); 

const seedUsers = async () => {
  // Koneksi ke database
  try {
    await mongoose.connect('mongodb://localhost:27017/donezo');

    console.log('Connected to MongoDB.');

    // Hapus semua data sebelumnya
    await User.deleteMany({});
    console.log('Existing users cleared.');

    // Data seed
    const users = [
      {
        name: 'John Doe',
        email: 'john@mail.com',
        password: await bcrypt.hash('123abc', 10), 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Jane Smith',
        email: 'jane@mail.com',
        password: await bcrypt.hash('123abc', 10),
        createdAt: new Date(),
      },
      {
        name: 'Alice Johnson',
        email: 'alice@mail.com',
        password: await bcrypt.hash('123abc', 10),
        createdAt: new Date(),
      },
    ];

    // Masukkan data seed ke database
    await User.insertMany(users);
    console.log('Users seeded successfully.');

    // Tutup koneksi ke database
    mongoose.connection.close();
    console.log('Database connection closed.');
  } catch (error) {
    console.error('Error seeding data:', error);
    mongoose.connection.close();
  }
};

seedUsers();
