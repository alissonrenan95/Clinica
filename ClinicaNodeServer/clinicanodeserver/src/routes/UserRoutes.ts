/*
import { PrismaClient } from "@prisma/client";
import { response, Router } from "express";
import UsuarioRepository from "../repositories/UsuarioRepository";

const userRoutes = Router();

userRoutes.post("/login", async (req, res)=>{
    const usuarioController=new UsuarioController();
    const {username, password}=req.body.user;
    const loginusuario=await usuarioController.findUsuarioByUsernameAndPassword(username,password);
    res.status(200).json({loginusuario,"roles":[5001]});
    
    

});

userRoutes.post("/loginbyemail", async (req, res)=>{
    const usuarioController=new UsuarioController();
    const {email, password}=req.body.user;
    const loginusuario=await usuarioController.findUsuarioByEmailAndPassword(email,password);
    res.status(200).json({loginusuario,"roles":[5001]});
    

});


userRoutes.post("/create", async(req, res)=>{
    const usuarioController=new UsuarioController();
    const {nomeusuario, senha, email}=req.body.user;
    const ativo=true;
    const saldo=0;
    const usuario={nomeusuario, senha, email, ativo, saldo}
    const id=await usuarioController.create(usuario);
    res.status(200).json(id);
});

userRoutes.post("/delete", async(req,res)=>{
    const usuarioController=new UsuarioController();
    const{usuarioid}=req.body.user;
    const deletedusuario=await usuarioController.delete(usuarioid);
    res.status(200).json(deletedusuario);
})

export {userRoutes};
*/