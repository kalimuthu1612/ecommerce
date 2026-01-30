import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";
import connectDB from "./config/db.js";

dotenv.config();

// Function to generate a random rating between 1 and 5
const getRandomRating = () => +(Math.random() * 4 + 1).toFixed(1); // 1.0 to 5.0

// Function to generate random reviews
const getRandomReviews = () => {
  const reviewCount = Math.floor(Math.random() * 5); // 0 to 4 reviews
  const reviews = [];
  for (let i = 0; i < reviewCount; i++) {
    reviews.push({
      user: new mongoose.Types.ObjectId(), // ✅ use new
      rating: Math.floor(Math.random() * 5) + 1, // 1 to 5
      comment: "Sample review " + (i + 1),
    });
  }
  return reviews;
};

// Sample products with proper URLs and categories
const products = [
  { name: "AirPods", price: 19999, imageUrl: "http://localhost:5000/uploads/airpods.webp", category: "Electronics" },
  { name: "Bluetooth Headset", price: 2999, imageUrl: "http://localhost:5000/uploads/bluetooth.webp", category: "Electronics" },
  { name: "Canon EOS R5", price: 289999, imageUrl: "http://localhost:5000/uploads/canoneosr5.webp", category: "Electronics" },
  { name: "Dell XPS 13", price: 129999, imageUrl: "http://localhost:5000/uploads/dellxps13.webp", category: "Electronics" },
  { name: "E-App (Electronics App)", price: 999, imageUrl: "http://localhost:5000/uploads/eapp.jpg", category: "Electronics" },
  { name: "Furniture Set", price: 15999, imageUrl: "http://localhost:5000/uploads/furniture.jpg", category: "Furniture" },
  { name: "Game Set", price: 4999, imageUrl: "http://localhost:5000/uploads/gameset.webp", category: "Electronics" },
  { name: "Headphones", price: 1999, imageUrl: "http://localhost:5000/uploads/headphones.jpg", category: "Electronics" },
  { name: "iPad Pro 12.9", price: 112999, imageUrl: "http://localhost:5000/uploads/ipadpro129.webp", category: "Electronics" },
  { name: "iPhone 14 Pro", price: 129999, imageUrl: "http://localhost:5000/uploads/iphone14pro.webp", category: "Electronics" },
  { name: "Jeans", price: 1299, imageUrl: "http://localhost:5000/uploads/jeans.jpg", category: "Clothing" },
  { name: "Keyboard", price: 1499, imageUrl: "http://localhost:5000/uploads/keyboard.webp", category: "Electronics" },
  { name: "Laptop", price: 59999, imageUrl: "http://localhost:5000/uploads/laptop.jpg", category: "Electronics" },
  { name: "LED TV", price: 45999, imageUrl: "http://localhost:5000/uploads/led_tv.webp", category: "Electronics" },
  { name: "Mouse", price: 799, imageUrl: "http://localhost:5000/uploads/mouse.webp", category: "Electronics" },
  { name: "Samsung Galaxy S23", price: 74999, imageUrl: "http://localhost:5000/uploads/samsunggalaxys23.jpg", category: "Electronics" },
  { name: "Samsung Phone", price: 24999, imageUrl: "http://localhost:5000/uploads/samsung_phone.webp", category: "Electronics" },
  { name: "Shoes", price: 2499, imageUrl: "http://localhost:5000/uploads/shoes.jpg", category: "Clothing" },
  { name: "Smartwatch", price: 8999, imageUrl: "http://localhost:5000/uploads/smartwatch.jpg", category: "Electronics" },
  { name: "Sneakers", price: 2999, imageUrl: "http://localhost:5000/uploads/sneakers.jpg", category: "Clothing" },
  { name: "Sony Headphones", price: 6999, imageUrl: "http://localhost:5000/uploads/sony_headphones.jpg", category: "Electronics" },
  { name: "Sony WH-1000XM5", price: 29999, imageUrl: "http://localhost:5000/uploads/sonywh1000xm5.webp", category: "Electronics" },
  { name: "T-Shirt", price: 499, imageUrl: "http://localhost:5000/uploads/tshirt.jpg", category: "Clothing" },
  { name: "Tab", price: 24999, imageUrl: "http://localhost:5000/uploads/tab.jpg", category: "Electronics" }
];


// Add random reviews and averageRating to each product
products.forEach((p) => {
  p.reviews = getRandomReviews();
  if (p.reviews.length > 0) {
    p.averageRating =
      p.reviews.reduce((sum, r) => sum + r.rating, 0) / p.reviews.length;
  } else {
    p.averageRating = getRandomRating();
  }
});

const seedProducts = async () => {
  try {
    await connectDB();

    // Remove existing products
    await Product.deleteMany();

    // Insert sample products
    await Product.insertMany(products);

    console.log("Database seeded with random product ratings!");
    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedProducts();