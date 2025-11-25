import express, { Application } from "express";
import bodyParser from "body-parser";
import userRouter from "./routes/user.route";

const app: Application = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
