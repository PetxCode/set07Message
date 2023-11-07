import { Application, Request, Response } from "express";
import auth from "./router/authRouter";
import chat from "./router/chatRouter";
import chatMessage from "./router/chatMessageRouter";
export const mainApp = (app: Application) => {
  try {
    app.use("/api/", auth);
    app.use("/api/", chat);
    app.use("/api/", chatMessage);

    app.get("/", (req: Request, res: Response) => {
      try {
        return res.status(200).json({
          message: "Welcome to social App API",
        });
      } catch (error) {
        return res.status(404).json({
          message: "Error",
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
