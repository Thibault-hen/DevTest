import express from "express";
import router from "./src/test.ts";
import "dotenv/config";

const port = process.env.PORT ?? 5000;
const app = express();

app.use(router);

app.listen(port, () => {
	console.log(`Server is listening at port ${port}`);
});
