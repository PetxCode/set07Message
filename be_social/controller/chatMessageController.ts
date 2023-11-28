import { Request, Response } from "express";
import chatMessageModel from "../model/chatMessage";
import amqplib from "amqplib";

export const ccreateChatMessage = async (req: Request, res: Response) => {
  try {
    const { authID, chatID } = req.params;
    const { message } = req.body;

    const chatMessage = await chatMessageModel.create({
      authID,
      chatID,
      message,
    });

    // await notificationModel.create(chatMessage);

    const URL: string = "amqp://localhost:5672";
    const connect = await amqplib.connect(URL);
    const channel = await connect.createChannel();

    await channel.sendToQueue(
      "sendChat",
      Buffer.from(JSON.stringify(chatMessage))
    );

    return res.status(201).json({
      message: "create message",
      data: chatMessage,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};

export const readChatMessage = async (req: Request, res: Response) => {
  try {
    const { chatID } = req.params;

    const chatMessage = await chatMessageModel.find({
      chatID,
    });

    return res.status(200).json({
      message: "read chat message",
      data: chatMessage,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};
