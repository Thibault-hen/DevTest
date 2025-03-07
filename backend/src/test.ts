import express, { type Request, type Response } from "express";

const router = express();

router.get("/1", (req: Request, res: Response) => {
	res.send(":)");
});

router.get("/2", (req: Request, res: Response) => {
	res.send("(:");
});

export default router;
