import { Router } from "express";
import BidsController from "../controllers/bids";

const bidsRouter = Router();

const bidsController = new BidsController();

bidsRouter.post("/", bidsController.createBid);
bidsRouter.put("/:id", bidsController.updateBid);
export default bidsRouter;
