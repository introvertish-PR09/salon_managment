const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const authRouter = require('./routes/authRoutes');
const serviceRouter = require('./routes/serviceRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const userRouter = require('./routes/userRouter');
dotenv.config();
connectDB();

const app = express();
app.use(cors({origin : "*"}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));




app.use('/api/auth',authRouter);
app.use('/api/services',serviceRouter);
app.use('/api/bookings',bookingRouter);
app.use('/api/users',userRouter);

app.get('/', (req, res) => {
  res.send('Salon Management Backend Running 🚀');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
