import express, { Application } from "express";
import cors from "cors";
import { mianDBConfig } from "./utils/dbConfig";
import { mainApp } from "./mainApp";

const port: number = 3322;
const app: Application = express();

app.use(cors());
app.use(express.json());

mainApp(app);
app.listen(port, () => {
  console.log();
  mianDBConfig();
});
