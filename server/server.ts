import app from "./app";
import dotenv from "dotenv";
import { database } from "./utils/database";

dotenv.config();

// create server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);

  // connecting database
  database();
});


