const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRouter = require('./routes/authRoutes');


dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());




app.use('/api/auth',authRouter);

app.get('/', (req, res) => {
  res.send('Salon Management Backend Running 🚀');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
