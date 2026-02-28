import "reflect-metadata";
import { app } from "./app";
import { AppDataSource } from "../infrastructure/database/typeorm/data-source";

const PORT: number = 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("DB connected");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.error("DB connection error", error));
