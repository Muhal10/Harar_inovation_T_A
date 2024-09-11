const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const News = require('./models/News');  // Import the News model
const app = express();

mongoose.connect('mongodb://localhost:27017/newsDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));
// Set up Multer for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');  // Ensure the 'uploads' directory exists
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);  // Unique filename
    }
});
const upload = multer({ storage: storage });

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from 'public' and 'uploads' directories
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static('uploads'));  // Serve uploaded images

// Upload an image with news data
app.post('/upload-news', upload.single('imageFile'), (req, res) => {
    const { title, description } = req.body;
    const imageUrl = `/uploads/${req.file.filename}`;

    // Save the news article to MongoDB
    const newsArticle = new News({
        title,
        description,
        imageUrl
    });

    newsArticle.save()
        .then(() => {
            res.json({ message: 'News article uploaded successfully!' });
        })
        .catch(err => {
            console.error('Error saving news article:', err);
            res.status(500).json({ message: 'Failed to save news article.' });
        });
});

// Get all news articles
app.get('/news', (req, res) => {
    News.find().sort({ createdAt: -1 })
        .then(news => {
            res.json(news);
        })
        .catch(err => {
            console.error('Error retrieving news:', err);
            res.status(500).json({ message: 'Failed to retrieve news.' });
        });
});

// Delete all news articles
app.delete('/delete-all-news', (req, res) => {
    News.deleteMany({})
        .then(() => {
            res.json({ message: 'All news articles deleted successfully!' });
        })
        .catch(err => {
            console.error('Error deleting news:', err);
            res.status(500).json({ message: 'Failed to delete news.' });
        });
});

// Start the server
app.listen(3001, () => console.log('Server started on port 3001'));