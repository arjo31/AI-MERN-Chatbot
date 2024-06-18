import { compare, hash } from "bcrypt";
import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import { COOKIE_NAME } from "../utils/constants";
import { createToken } from "../utils/token_manager";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //Get All users from Database
  try {
    const users = await User.find();

    return res.status(200).json({ message: "OK", users });
  } catch (error) {
    let errorMessage = "User Data Can't Be Fetched";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.log(errorMessage);
    return res.status(500).json({ message: "ERROR", cause: errorMessage });
  }
};

export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //User Signup
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) return res.status(401).send("User already registered");
    const hashedPassword = await hash(password, 10);
    const user = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });
    await user.save();

    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      path: "/",
      signed: true,
    });

    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires: expires,
      httpOnly: true,
      signed: true,
    });

    return res
      .status(201)
      .json({ message: "POST OK", id: user._id.toString() });
  } catch (error) {
    let errorMessage = "Couldn't POST in Database";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return res.status(500).json({ message: "ERROR", cause: errorMessage });
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //User Login
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(401).send("User not registered");
    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) return res.status(403).send("Incorrect Password");

    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      path: "/",
      signed: true,
    });

    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires: expires,
      httpOnly: true,
      signed: true,
    });

    return res
      .status(200)
      .json({ message: "LOGIN OK", name: user.name, email: user.email });
  } catch (error) {
    let errorMessage = "Couldn't POST in Database";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return res.status(500).json({ message: "ERROR", cause: errorMessage });
  }
};

export const verifyUser = async (
  //User token check
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOne({ email: res.locals.jwtData.email });
    if (!user) {
      return res.status(401).send("User not registered or token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    return res
      .status(200)
      .json({ message: "User Verified", name: user.name, email: user.email });
  } catch (error) {
    let errorMessage = "Couldn't POST in Database";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return res.status(500).json({ message: "ERROR", cause: errorMessage });
  }
};

export const userLogout = async (
  //User token check
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOne({ email: res.locals.jwtData.email });
    if (!user) {
      return res.status(401).send("User not registered or token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }

    res.clearCookie(COOKIE_NAME, {
      httpOnly:true,
      domain:"localhost",
      signed:true,
      path:"/"
    })
    
    return res
      .status(200)
      .json({ message: "User Verified", name: user.name, email: user.email });
  } catch (error) {
    let errorMessage = "Couldn't POST in Database";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return res.status(500).json({ message: "ERROR", cause: errorMessage });
  }
};
