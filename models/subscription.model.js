import mongoose from "mongoose";
import dayjs from 'dayjs';

const subscriptionSchema = mongoose.Schema({
  name:{
    type: String,
    required: [true, 'Subscription name is required'],
    trim: true,
    minLength: 2,
    maxLength: 100,
  },
  price: {
    type: Number,
    required: [true, 'Subscription price is required'],
    min: [0, 'Price must be greater than 0'],
    max: [1000, 'Price must be less than 1000'],
  },
  currency: {
    type: String,
    enum: ['USD', 'EUR', 'NGN', 'GBP'],
    default: 'NGN'
  },
  frequency: {
    type: String,
    enum: ['daily','weekly','monthly','yearly'],
  },
  category: {
    type: String,
    enum: ['sports','news','entertainment','lifestyle','technology','finance','politics','other'],
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ['active','cancelled','expired',],
    default: 'active'
  },
  startDate: {
    type: Date,
    required: true,
    validate: {
      validator: (value) => value <= new Date(),
      message: 'Start Date must be in the past'
    }
  },
  renewalDate: {
    type: Date,
    validate: {
      validator: function (value) { return value > this.startDate()},
      message: 'Renewal Date must be after the start date'
    }
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  }
}, {timestamps: true});

// Auto-calculate renewal Date if missing
subscriptionSchema.pre('save', function(next) {
  if (!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };

    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
  }

  // Auto-update the status if renewal date has passed
  if (this.renewalDate < new Date()) {
    this.status = 'expired'
  }
  next();
})

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;