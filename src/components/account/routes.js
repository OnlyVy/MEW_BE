import express from "express";
import accountControllers from "./controllers";

const accountRoutes = express.Router();

//======================== GET ========================
accountRoutes.get("/info", accountControllers.getAccountInfo);

//======================== POST ========================
accountRoutes.post("/create-wallet", accountControllers.createWallet);

//======================== PUT ========================
//======================== DELETE ========================

export default accountRoutes;