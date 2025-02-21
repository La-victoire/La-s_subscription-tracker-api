import mongoose from "mongoose"
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import { JWT_EXPIRES, JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";

// these functions are surposed to accept a signup and a signin in my website but it has not been properly tested so remember to test them in postman later   

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
   session.startTransaction();

  try {
    // user creation logic
    const { name, email, password} = req.body;

    // check if user exists
    const exsitingUser = await User.findOne({email});

    if (exsitingUser) {
      const error = new Error('User already exists');
      error.statusCode = 409
      throw error
    };

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUsers = await User.create([{ name, email, password:hashedPassword }], {session});

    const token = jwt.sign({userId: newUsers[0]._id}, JWT_SECRET, { expiresIn: JWT_EXPIRES});

     session.commitTransaction();
     session.endSession();

     res.status(201).json({
      success: true,
      message: 'User Created successfully',
      data: {
        token,
        user: newUsers[0]
      }
     })

  } catch (error) {
    session.abortTransaction();
    session.endSession();
    next(error);}
};

export const signIn = async (req, res, next) => { 
  try {
    const { email, password } = req.body;

    const user = await User.findOne({email});
    
    if (!user) {
      const error = new Error('User does not exist');
      error.statusCode = 404;
      throw error;
    };

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error('Invaild Password bruh');
      error.statusCode = 401;
      throw error;
   };

   const token = jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES});

   res.status(200).json({
    success: true,
    message: 'User signed in successfully',
    data: {
      token,
      user,
    }
   })
 } catch(error) {
  next(error);
 };
};

export const signOut = async (req, res, next) => { };

