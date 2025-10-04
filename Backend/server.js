import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { CruiseLogin, Cater, Stationery,BeautyBooking ,PartyBooking ,Summary} from './models/cruise.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// ----------------- CONNECT TO MONGODB -----------------
async function connectDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/cruise', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
  }
}
connectDB();

// ----------------- ROOT -----------------
app.get('/', (req, res) => {
  res.send('Welcome to Cruise Backend');
});



// ----------------- LOGIN -----------------
app.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Check if all fields are provided
    if (!email || !password || !role) {
      return res.status(400).json({ message: "Email, password, and role are required" });
    }

    // Check if user exists
    let user = await CruiseLogin.findOne({ email, role });
    if (!user) {
      user = await new CruiseLogin({ email, password, role }).save();
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in" });
  }
});
app.get("/login",async(req,res)=>{
  try{
    const users=await CruiseLogin.find().sort({createdAt:-1});
    res.json(users);
  }
  catch(error){
    console.error(error);
    res.status(500).json({message:"Error fetching users"});
  }
})


// ----------------- CATERING ORDER -----------------
app.post('/cateringback', async (req, res) => {
  try {
    const { email, cart } = req.body;
    if (!cart || cart.length === 0) return res.status(400).json({ message: "Cart is empty" });

    const newCatering = new Cater({
      email,
      cater1: cart.map(item => ({ item: item.name, price: item.price })),
      quantity: cart.reduce((total,item)=> total+ item.quantity,0)
    });

    await newCatering.save();
    res.status(201).json({ message: "Catering order placed successfully", order: newCatering });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error placing catering order" });
  }
});
// to get all catering orders
app.get('/cateringback', async (req, res) => {
  try {
    const orders = await Cater.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching catering orders" });
  }
});


// ----------------- STATIONERY ORDER -----------------
app.post('/stationeryback', async (req, res) => {
  try {
    const { email, cart } = req.body;
    if (!cart || cart.length === 0) return res.status(400).json({ message: "Cart is empty" });

    const newStationery = new Stationery({
      email,
      cart: cart.map(item => ({
        item: item.name,
        price: item.price,
        quantity: item.quantity || 1,
      })),
    });

    await newStationery.save();
    res.status(201).json({ message: "Stationery order placed successfully", order: newStationery });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error placing stationery order" });
  }
});
// to get the statioary orders
app.get('/stationeryback', async (req, res) => {
  try {
    const orders = await Stationery.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching stationery orders" });
  }
});

// beauty parolour
app.post("/api/bookings", async (req, res) => {
  try {
    const { email, services } = req.body;

    if (!email || !services || services.length === 0) {
      return res.status(400).json({ message: "Invalid booking data" });
    }

    const booking = new BeautyBooking({ email, services });
    await booking.save();

    res.status(201).json({ message: "Booking successful", booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Optional: get all bookings (for admin/testing)
app.get("/api/bookings", async (req, res) => {
  try {
    const bookings = await BeautyBooking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});



app.post('/partybooking', async (req, res) => {
  try {
    const { email, partyType, date, time, services } = req.body;

    // Basic validation
    if (!email || !partyType || !date || !time || !services || services.length === 0) {
      return res.status(400).json({ message: 'All fields are required and at least one service must be selected' });
    }

    // Save booking to DB
    const booking = new PartyBooking({ email, partyType, date, time, services });
    await booking.save();

    res.status(201).json({ message: 'Party booked successfully', booking });
  } catch (error) {
    console.error('Error booking party:', error);
    res.status(500).json({ message: 'Server error. Try again later.' });
  }
});

// GET all bookings (optional, for admin/testing)
app.get('/bookings', async (req, res) => {
  try {
    const bookings = await PartyBooking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
// to save the summary of all user
// POST /summaryback
app.post("/summaryback", async (req, res) => {
  try {
    const { email, cateringOrders, stationeryOrders, beautyBookings, partyBookings } = req.body;

    let summary = await Summary.findOne({ email });

    if (summary) {
      // Update existing summary
      summary.cateringOrders = cateringOrders;
      summary.stationeryOrders = stationeryOrders;
      summary.beautyBookings = beautyBookings;
      summary.partyBookings = partyBookings;
      await summary.save();
    } else {
      // Create new summary
      summary = new Summary({
        email,
        cateringOrders,
        stationeryOrders,
        beautyBookings,
        partyBookings
      });
      await summary.save();
    }

    res.json({ message: "Summary saved successfully", summary });
  } catch (err) {
    res.status(500).json({ message: "Error saving summary", error: err.message });
  }
});


app.get("/summaryback", async (req, res) => {
  try {
    const userEmail = req.query.email;

    if (userEmail) {
      // return single user's summary
      const summaryBooking = await Summary.findOne({ email: userEmail }).sort({ createdAt: -1 });
      if (!summaryBooking) {
        return res.status(404).json({ message: "No summary found for this user" });
      }
      return res.json(summaryBooking);
    }

    // else return ALL summaries
    const allSummaries = await Summary.find().sort({ createdAt: -1 });
    res.json(allSummaries);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching summary" });
  }
});


// ----------------- START SERVER -----------------
app.listen(port, () => {
  console.log(`🚢 Cruise server running on port ${port}`);
});
