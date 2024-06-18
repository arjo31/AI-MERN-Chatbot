import { NextFunction, Request, Response } from "express";
import ollama from "ollama";
import User from "../models/User";

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user)
      return res
        .status(401)
        .json({ message: "User not registered or token malfunctioned" });
    //Grab chats of user
    const chats = user.chats.map(({ role, content }) => ({ role, content }));
    chats.push({ content: message, role: "user" });
    user.chats.push({ content: message, role: "user" });
    //Send all chats with new one to Claude/Ollama API
    const chatResponse = await ollama.chat({
      model: "phi3:mini",
      messages: chats,
    });
    //Get latest response
    user.chats.push({
      content: chatResponse.message.content,
      role: "assistant",
    });
    await user.save();
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    let errorMessage = "Couldn't POST in Database";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return res.status(500).json({ message: "ERROR", cause: errorMessage });
  }
};

export const sendChatsToUser = async (
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
      .json({ message: "User Verified", chats: user.chats });
  } catch (error) {
    let errorMessage = "Couldn't get detail from database";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return res.status(500).json({ message: "ERROR", cause: errorMessage });
  }
};

export const deleteChats = async (
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
    //@ts-ignore
    user.chats = [];
    await user.save();
    return res
      .status(200)
      .json({ message: "Chats successfully deleted" });
  } catch (error) {
    let errorMessage = "Couldn't Delete in Database";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return res.status(500).json({ message: "ERROR", cause: errorMessage });
  }
};
