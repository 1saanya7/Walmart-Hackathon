import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { MongoClient, ObjectId } from 'mongodb';
import { initialize, hybridSearch } from './hybridSearch.js';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI;
let db;

// ESM workaround for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      tls: true,
      tlsAllowInvalidCertificates: true, // ✅ Correct replacement
      serverSelectionTimeoutMS: 10000,
    });

    db = mongoose.connection.db;
    console.log('✅ Connected to MongoDB Atlas via Mongoose (TLS certs skipped)');
  } catch (err) {
    console.error('❌ Mongoose TLS connection failed:', err.message);
    process.exit(1);
  }
};
// Routes
app.get('/api/products', async (req, res) => {
    const { search, category, limit = 12, page = 1 } = req.query;
    const skip = (page - 1) * limit;

    try {
        let products = [];

        if (search) {
            products = await hybridSearch(search, 50, 0.5);
            if (category && category !== 'all') {
                products = products.filter(p => p.category === category);
            }

            const paginated = products.slice(skip, skip + parseInt(limit));
            return res.json({
                products: paginated,
                total: products.length,
                page: parseInt(page),
                totalPages: Math.ceil(products.length / limit)
            });
        }

        // Fallback to normal query
        const query = category && category !== 'all' ? { category } : {};
        products = await db.collection('books')
            .find(query)
            .sort({ date: -1 })
            .skip(skip)
            .limit(parseInt(limit))
            .toArray();
        const total = await db.collection('books').countDocuments(query);

        res.json({
            products,
            total,
            page: parseInt(page),
            totalPages: Math.ceil(total / limit)
        });
    } catch (err) {
        console.error('Search Error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get unique categories
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await db.collection('books')
      .distinct('category');
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single product
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await db.collection('books')
      .findOne({ _id: new ObjectId(req.params.id) });
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
connectDB()
  .then(() => initialize(MONGO_URI, db.databaseName, 'books'))
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Startup error:', err);
    process.exit(1);
  });