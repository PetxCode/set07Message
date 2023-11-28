import express, { Application } from "express";
import cors from "cors";
import { mianDBConfig } from "./utils/dbConfig";
import { mainApp } from "./mainApp";
import { Server, Socket } from "socket.io";
import http from "http";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import amqplib from "amqplib";
import notificationModel from "./model/notificationModel";

const port: number = 3322;
const app: Application = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

mainApp(app);
server.listen(port, () => {
  console.log();
  mianDBConfig();
});

io.on(
  "connection",
  async (
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
  ) => {
    console.log(socket.id);
    const URL: string = "amqp://localhost:5672";
    let newData: any = [];

    const connect = await amqplib.connect(URL);
    const channel = await connect.createChannel();
    await channel.assertQueue("sendChat");

    await channel.consume("sendChat", async (res: any) => {
      newData.push(await JSON.parse(res?.content.toString()));

      await notificationModel.create({
        notice: {
          data: await JSON.parse(res?.content.toString()),
          message: "coming from chat",
        },
      });
      console.log(newData);

      socket.emit("set07i", await newData);

      await channel.ack(res);
    });

    // await channel.consume("send", async (res: any) => {
    //   newData.push(await JSON.parse(res?.content.toString()));
    //   console.log(res);
    //   console.log(newData);
    //   socket.emit("set07i", await newData);

    //   await channel.ack(res);
    // });
  }
);
