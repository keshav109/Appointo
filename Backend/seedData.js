const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/userModel');
const Doctor = require('./models/doctorModel');
require('dotenv').config();

const seedDoctors = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');


    // Doctor emails to seed
    const doctorEmails = [
      'priya.sharma@Appointo.com',
      'rajesh.patel@Appointo.com',
      'anita.gupta@Appointo.com',
      'suresh.kumar@Appointo.com',
      'meera.desai@Appointo.com',
      'arjun.nair@Appointo.com',
      'kavita.reddy@Appointo.com',
      'neeraj.bansal@Appointo.com',
      'shalini.verma@Appointo.com',
      'rohan.khanna@Appointo.com',
      'sneha.pillai@Appointo.com',
      'manish.tiwari@Appointo.com',
      'aisha.khan@Appointo.com',
      'vikas.choudhary@Appointo.com',
      'ritu.malhotra@Appointo.com'
    ];

    // Remove any users with these emails (regardless of role)
    await User.deleteMany({ email: { $in: doctorEmails } });
    await Doctor.deleteMany({});
    console.log('🧹 Cleared existing doctor data');

    // Doctor users
    const doctorUsers = [
      { name: 'Dr. Priya Sharma', email: 'priya.sharma@Appointo.com', password: await bcrypt.hash('doctor123', 10), role: 'doctor' },
      { name: 'Dr. Rajesh Patel', email: 'rajesh.patel@Appointo.com', password: await bcrypt.hash('doctor123', 10), role: 'doctor' },
      { name: 'Dr. Anita Gupta', email: 'anita.gupta@Appointo.com', password: await bcrypt.hash('doctor123', 10), role: 'doctor' },
      { name: 'Dr. Suresh Kumar', email: 'suresh.kumar@Appointo.com', password: await bcrypt.hash('doctor123', 10), role: 'doctor' },
      { name: 'Dr. Meera Desai', email: 'meera.desai@Appointo.com', password: await bcrypt.hash('doctor123', 10), role: 'doctor' },

      // 🔥 Added 10 more
      { name: 'Dr. Arjun Nair', email: 'arjun.nair@Appointo.com', password: await bcrypt.hash('doctor123', 10), role: 'doctor' },
      { name: 'Dr. Kavita Reddy', email: 'kavita.reddy@Appointo.com', password: await bcrypt.hash('doctor123', 10), role: 'doctor' },
      { name: 'Dr. Neeraj Bansal', email: 'neeraj.bansal@Appointo.com', password: await bcrypt.hash('doctor123', 10), role: 'doctor' },
      { name: 'Dr. Shalini Verma', email: 'shalini.verma@Appointo.com', password: await bcrypt.hash('doctor123', 10), role: 'doctor' },
      { name: 'Dr. Rohan Khanna', email: 'rohan.khanna@Appointo.com', password: await bcrypt.hash('doctor123', 10), role: 'doctor' },
      { name: 'Dr. Sneha Pillai', email: 'sneha.pillai@Appointo.com', password: await bcrypt.hash('doctor123', 10), role: 'doctor' },
      { name: 'Dr. Manish Tiwari', email: 'manish.tiwari@Appointo.com', password: await bcrypt.hash('doctor123', 10), role: 'doctor' },
      { name: 'Dr. Aisha Khan', email: 'aisha.khan@Appointo.com', password: await bcrypt.hash('doctor123', 10), role: 'doctor' },
      { name: 'Dr. Vikas Choudhary', email: 'vikas.choudhary@Appointo.com', password: await bcrypt.hash('doctor123', 10), role: 'doctor' },
      { name: 'Dr. Ritu Malhotra', email: 'ritu.malhotra@Appointo.com', password: await bcrypt.hash('doctor123', 10), role: 'doctor' }
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
        image: 'https://png.pngtree.com/thumb_back/fh260/background/20250410/pngtree-a-beautiful-female-doctor-from-the-united-kingdom-image_17179430.jpg'
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
        image: 'https://t4.ftcdn.net/jpg/07/07/89/33/360_F_707893394_5DEhlBjWOmse1nyu0rC9T7ZRvsAFDkYC.jpg'
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
        image: 'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsb2ZmaWNlMV9waG90b2dyYXBoeV9vZl9hbl9zb3V0aF9pbmRpYW5fd29tZW5fYXNfYV9kb2N0b19kMzAxMDM3Zi03MDUzLTQxNDAtYmYyZS1lZDFlYWE0YTM3NDRfMS5qcGc.jpg'
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
        image: 'https://media.istockphoto.com/id/1327024466/photo/portrait-of-male-doctor-in-white-coat-and-stethoscope-standing-in-clinic-hall.jpg?s=612x612&w=0&k=20&c=49wqOwwuonk9f8NACL7M_5RosqQPFwJ8-dpmeo9AvQw='
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
        image: 'https://images.pexels.com/photos/3714743/pexels-photo-3714743.jpeg'
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
        image: 'https://media.istockphoto.com/id/1342708859/photo/portrait-of-a-male-doctor.jpg?s=612x612&w=0&k=20&c=7ojvfSnLNx73sR1xXTReBrIXJOZPpSNFZ3E9CodsfQU='
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
        image: 'https://media.istockphoto.com/id/1293373291/photo/portrait-of-confident-ethnic-female-doctor.jpg?s=612x612&w=0&k=20&c=CJsw6IgTecJZoBeVXqZdvh2BI-NyVa-8VcQM3fPhbYc='
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
        image: 'https://t4.ftcdn.net/jpg/06/02/25/57/360_F_602255772_9u1hkJnD9tAyqnrL89XYtbM9RykuDxnf.jpg'
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
        image: 'https://t4.ftcdn.net/jpg/03/20/74/45/360_F_320744517_TaGkT7aRlqqWdfGUuzRKDABtFEoN5CiO.jpg'
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
        image: 'https://t3.ftcdn.net/jpg/06/81/62/44/360_F_681624470_Bove01iM9IM8fxlgEOGdnntS3zBKjsxK.jpg'
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
        image: 'https://thumbs.dreamstime.com/b/young-indian-female-doctor-holding-red-heart-shape-happy-77438932.jpg'
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
        image: 'https://t3.ftcdn.net/jpg/03/00/22/02/360_F_300220248_VKEd3QKx31kzqHcwZfnGmWKZLYTjf8R0.jpg'
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
        image: 'https://t3.ftcdn.net/jpg/01/14/89/28/360_F_114892812_Va0KWhvmSUOoYNEoHCAOJ8uYXzBiD8vY.jpg'
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
        image: 'https://static.vecteezy.com/system/resources/thumbnails/030/928/115/small_2x/handsome-indian-doctor-generate-ai-photo.jpg'
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
        image: 'https://www.shutterstock.com/image-photo/closeup-lady-doctor-folding-arms-260nw-2453086223.jpg'
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
