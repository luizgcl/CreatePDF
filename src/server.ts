import express from "express";
import { routes } from "./routes/routes";

const App = express();

App.use(routes);
App.listen(3000, () => { console.log("Server is running on port 3000!") });

export { App };