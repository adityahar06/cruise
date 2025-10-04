import mongoose from "mongoose";




// ----------------- LOGIN SCHEMA -----------------
const cruiseLoginSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // plain text, optional: use bcrypt later
  role: { type: String, required: true},
});

export const CruiseLogin = mongoose.model("CruiseLogin", cruiseLoginSchema);

// ----------------- ITEM SCHEMA -----------------
const itemSchema = new mongoose.Schema({
  item: { type: String, required: true },
  price: { type: Number, required: true },
});

export const Item = mongoose.model("Item", itemSchema);

// ----------------- CART SCHEMA -----------------
const cartSchema = new mongoose.Schema({
  cart: [itemSchema], // array of items with price
});

export const Cart = mongoose.model("Cart", cartSchema);

// ----------------- CATERING SCHEMA -----------------
const cateringSchema = new mongoose.Schema({
  email: { type: String, required: true }, // user placing the order
  cater1: [itemSchema], // items in the order
  cater2: [cartSchema], // optional: multiple carts per order
  quantity:{type:Number}
});

export const Cater = mongoose.model("Cater", cateringSchema);

// ----------------- STATIONERY SCHEMA -----------------
const stationerySchema = new mongoose.Schema({
  email: { type: String, required: true }, // user placing the order
  cart: [
    {
      item: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    }
  ],
});

export const Stationery = mongoose.model("Stationery", stationerySchema);
// beauty parolur


const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  plan: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
});

const beautyBookingSchema = new mongoose.Schema({
  email: { type: String, required: true },
  services: [serviceSchema],
  createdAt: { type: Date, default: Date.now },
});

export const BeautyBooking = mongoose.model("BeautyBooking", beautyBookingSchema);



// party
const partyBookingSchema = new mongoose.Schema({
  email: { type: String, required: true },
  partyType: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  services: [{ type: String, required: true }], // array of selected service names
  createdAt: { type: Date, default: Date.now },
});

export const PartyBooking = mongoose.model('PartyBooking', partyBookingSchema);

// summary page
const summarySchema=new mongoose.Schema({
  email:{type:String,required:true},
  cateringOrders:[cateringSchema],
  stationeryOrders:[stationerySchema],
  beautyBookings:[beautyBookingSchema],
  partyBookings:[partyBookingSchema],
},{ timestamps: true });
export const Summary=mongoose.model('Summary',summarySchema);