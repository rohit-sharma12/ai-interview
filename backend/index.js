const express = require('express')
const cors = require('cors')
const path = require('path');
// const { connect } = require('http2');
require('dotenv').config();
const connectDB = require('./config/db')
const authRoute = require('./routes/authRoute')
const sessionRoute = require('./routes/sessionRoute')
const questionRoute = require('./routes/questionRoute')
const { protect } = require('./middlewares/authMiddleware')
const { generateInterviewQuestions, generateConceptExplanation } = require ('./controllers/aiController')
const app = express()

app.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    })
)

connectDB()

app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/sessions', sessionRoute);
app.use('/api/questions', questionRoute);

app.use('/api/ai/generate-questions', protect, generateInterviewQuestions);
app.use('/api/ai/generate-explanation', protect, generateConceptExplanation)

app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {}))

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
})