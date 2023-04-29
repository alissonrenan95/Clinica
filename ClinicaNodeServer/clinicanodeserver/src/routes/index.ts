import { Router } from "express";
//import { userRoutes } from "./user-routes";
import {AtendimentoRoutes} from "./AtendimentoRoutes";
const routes=Router();

//routes.use("/users", userRoutes);
routes.use("/Atendimento",AtendimentoRoutes);

export {routes};