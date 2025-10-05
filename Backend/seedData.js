const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/userModel');
const Doctor = require('./models/doctorModel');
require('dotenv').config();

const seedDoctors = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing doctor data
    await User.deleteMany({ role: 'doctor' });
    await Doctor.deleteMany({});
    console.log('🧹 Cleared existing doctor data');

    // Doctor users
    const doctorUsers = [
      { name: 'Dr. Priya Sharma', email: 'priya.sharma@myturn.com', password: await bcrypt.hash('doctor123', 10), role: 'doctor' },
      { name: 'Dr. Rajesh Patel', email: 'rajesh.patel@myturn.com', password: await bcrypt.hash('doctor123', 10), role: 'doctor' },
      { name: 'Dr. Anita Gupta', email: 'anita.gupta@myturn.com', password: await bcrypt.hash('doctor123', 10), role: 'doctor' },
      { name: 'Dr. Suresh Kumar', email: 'suresh.kumar@myturn.com', password: await bcrypt.hash('doctor123', 10), role: 'doctor' },
      { name: 'Dr. Meera Desai', email: 'meera.desai@myturn.com', password: await bcrypt.hash('doctor123', 10), role: 'doctor' },

      // 🔥 Added 10 more
      { name: 'Dr. Arjun Nair', email: 'arjun.nair@myturn.com', password: await bcrypt.hash('doctor123', 10), role: 'doctor' },
      { name: 'Dr. Kavita Reddy', email: 'kavita.reddy@myturn.com', password: await bcrypt.hash('doctor123', 10), role: 'doctor' },
      { name: 'Dr. Neeraj Bansal', email: 'neeraj.bansal@myturn.com', password: await bcrypt.hash('doctor123', 10), role: 'doctor' },
      { name: 'Dr. Shalini Verma', email: 'shalini.verma@myturn.com', password: await bcrypt.hash('doctor123', 10), role: 'doctor' },
      { name: 'Dr. Rohan Khanna', email: 'rohan.khanna@myturn.com', password: await bcrypt.hash('doctor123', 10), role: 'doctor' },
      { name: 'Dr. Sneha Pillai', email: 'sneha.pillai@myturn.com', password: await bcrypt.hash('doctor123', 10), role: 'doctor' },
      { name: 'Dr. Manish Tiwari', email: 'manish.tiwari@myturn.com', password: await bcrypt.hash('doctor123', 10), role: 'doctor' },
      { name: 'Dr. Aisha Khan', email: 'aisha.khan@myturn.com', password: await bcrypt.hash('doctor123', 10), role: 'doctor' },
      { name: 'Dr. Vikas Choudhary', email: 'vikas.choudhary@myturn.com', password: await bcrypt.hash('doctor123', 10), role: 'doctor' },
      { name: 'Dr. Ritu Malhotra', email: 'ritu.malhotra@myturn.com', password: await bcrypt.hash('doctor123', 10), role: 'doctor' }
    ];

    const createdUsers = await User.insertMany(doctorUsers);

    // Doctor profiles
    const doctorProfiles = [
      {
        userId: createdUsers[0]._id,
        name: 'Dr. Priya Sharma',
        specialty: 'Pediatrics',
        experience: '12 years',
        fee: 1500,
        address: 'Koramangala, Bangalore',
        timings: ['9:00 AM - 1:00 PM', '4:00 PM - 8:00 PM'],
        availability: 'Available',
        image: 'data:image/jpeg;base64,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'
      },
      {
        userId: createdUsers[1]._id,
        name: 'Dr. Rajesh Patel',
        specialty: 'Cardiology',
        experience: '15 years',
        fee: 2000,
        address: 'Bandra West, Mumbai',
        timings: ['10:00 AM - 2:00 PM', '5:00 PM - 9:00 PM'],
        availability: 'Available',
        image: 'https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=500&q=80'
      },
      {
        userId: createdUsers[2]._id,
        name: 'Dr. Anita Gupta',
        specialty: 'Dermatology',
        experience: '10 years',
        fee: 1800,
        address: 'Connaught Place, Delhi',
        timings: ['9:30 AM - 1:30 PM', '4:30 PM - 8:30 PM'],
        availability: 'Available',
        image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=500&q=80'
      },
      {
        userId: createdUsers[3]._id,
        name: 'Dr. Suresh Kumar',
        specialty: 'Orthopedics',
        experience: '18 years',
        fee: 2200,
        address: 'T Nagar, Chennai',
        timings: ['8:00 AM - 12:00 PM', '4:00 PM - 8:00 PM'],
        availability: 'Available',
        image: 'https://images.unsplash.com/photo-1606813902919-624fc41b42f2?auto=format&fit=crop&w=500&q=80'
      },
      {
        userId: createdUsers[4]._id,
        name: 'Dr. Meera Desai',
        specialty: 'Gynecology',
        experience: '14 years',
        fee: 1900,
        address: 'Satellite, Ahmedabad',
        timings: ['10:00 AM - 2:00 PM', '5:00 PM - 8:00 PM'],
        availability: 'Available',
        image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=500&q=80'
      },
      {
        userId: createdUsers[5]._id,
        name: 'Dr. Arjun Nair',
        specialty: 'Neurology',
        experience: '11 years',
        fee: 2500,
        address: 'Kakkanad, Kochi',
        timings: ['9:00 AM - 12:00 PM', '3:00 PM - 7:00 PM'],
        availability: 'Available',
        image: 'https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=500&q=80'
      },
      {
        userId: createdUsers[6]._id,
        name: 'Dr. Kavita Reddy',
        specialty: 'ENT',
        experience: '9 years',
        fee: 1200,
        address: 'Madhapur, Hyderabad',
        timings: ['10:00 AM - 1:00 PM', '4:00 PM - 8:00 PM'],
        availability: 'Available',
        image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=500&q=80'
      },
      {
        userId: createdUsers[7]._id,
        name: 'Dr. Neeraj Bansal',
        specialty: 'Oncology',
        experience: '20 years',
        fee: 3000,
        address: 'Sector 17, Chandigarh',
        timings: ['9:00 AM - 2:00 PM'],
        availability: 'Available',
        image: 'https://images.unsplash.com/photo-1606813902919-624fc41b42f2?auto=format&fit=crop&w=500&q=80'
      },
      {
        userId: createdUsers[8]._id,
        name: 'Dr. Shalini Verma',
        specialty: 'Psychiatry',
        experience: '13 years',
        fee: 1600,
        address: 'Park Street, Kolkata',
        timings: ['11:00 AM - 3:00 PM', '5:00 PM - 9:00 PM'],
        availability: 'Available',
        image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=500&q=80'
      },
      {
        userId: createdUsers[9]._id,
        name: 'Dr. Rohan Khanna',
        specialty: 'Pulmonology',
        experience: '8 years',
        fee: 1300,
        address: 'Sector 62, Noida',
        timings: ['9:00 AM - 12:00 PM', '4:00 PM - 7:00 PM'],
        availability: 'Available',
        image: 'https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=500&q=80'
      },
      {
        userId: createdUsers[10]._id,
        name: 'Dr. Sneha Pillai',
        specialty: 'Endocrinology',
        experience: '10 years',
        fee: 1800,
        address: 'Viman Nagar, Pune',
        timings: ['10:00 AM - 1:00 PM', '5:00 PM - 8:00 PM'],
        availability: 'Available',
        image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=500&q=80'
      },
      {
        userId: createdUsers[11]._id,
        name: 'Dr. Manish Tiwari',
        specialty: 'Gastroenterology',
        experience: '17 years',
        fee: 2400,
        address: 'Hazratganj, Lucknow',
        timings: ['8:00 AM - 12:00 PM', '4:00 PM - 8:00 PM'],
        availability: 'Available',
        image: 'https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=500&q=80'
      },
      {
        userId: createdUsers[12]._id,
        name: 'Dr. Aisha Khan',
        specialty: 'Ophthalmology',
        experience: '7 years',
        fee: 1100,
        address: 'Aliganj, Lucknow',
        timings: ['9:00 AM - 1:00 PM', '4:00 PM - 6:00 PM'],
        availability: 'Available',
        image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=500&q=80'
      },
      {
        userId: createdUsers[13]._id,
        name: 'Dr. Vikas Choudhary',
        specialty: 'Urology',
        experience: '16 years',
        fee: 2100,
        address: 'Gariahat, Kolkata',
        timings: ['10:00 AM - 2:00 PM', '5:00 PM - 9:00 PM'],
        availability: 'Available',
        image: 'https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=500&q=80'
      },
      {
        userId: createdUsers[14]._id,
        name: 'Dr. Ritu Malhotra',
        specialty: 'Rheumatology',
        experience: '9 years',
        fee: 1700,
        address: 'Gachibowli, Hyderabad',
        timings: ['9:30 AM - 1:30 PM', '4:30 PM - 7:30 PM'],
        availability: 'Available',
        image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=500&q=80'
      }
    ];

    await Doctor.insertMany(doctorProfiles);
    console.log('🌱 Seed data inserted successfully!');

  } catch (error) {
    console.error('❌ Error seeding data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
};

seedDoctors();
