import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import AtendimentoRepository from "../repositories/AtendimentoRepository";

const AtendimentoRoutes = Router();

AtendimentoRoutes.post("/", async (req, res)=>{
    const atendimentoRepository=new AtendimentoRepository();
    const {id,pacienteid, datahoraatendimento, concluido}=req.body.atendimento;
    const result=await atendimentoRepository.create({pacienteid, datahoraatendimento, concluido})
    res.status(200).json(result);

});
AtendimentoRoutes.delete("/", async (req, res)=>{
    const atendimentoRepository=new AtendimentoRepository();
    const {id}=req.body.atendimento;
    const result=await atendimentoRepository.delete(id);
    res.status(200).json(result);
});

AtendimentoRoutes.get("/", async(req,res)=>{
    const atendimentoRepository=new AtendimentoRepository();
    const result=await atendimentoRepository.findAtendimentos();
    res.status(200).json(result);
})
AtendimentoRoutes.get("/:atendimentoid", async(req,res)=>{
    const atendimentoRepository=new AtendimentoRepository();
    const {atendimentoid}=req.params;
    const result=await atendimentoRepository.findAtendimentosByPacienteId(Number(atendimentoid));
    res.status(200).json(result);
})
AtendimentoRoutes.get("/resumetransactionsexpense", async(req,res)=>{
    const atendimentoRepository=new AtendimentoRepository();
    const result=await atendimentoRepository.findResultMovimentacoesSaidaByUserIDAndDataRegistroBeforeDate(9,new Date());
    console.log(result);
    res.status(200).json(result);
})

AtendimentoRoutes.get("/resumecalculated", async(req,res)=>{
    const atendimentoRepository=new AtendimentoRepository();
    const result=await atendimentoRepository.findSaldoMovimentacoesByUserIDAndDataRegistroBeforeDate(9,new Date());
    console.log(result);
    res.status(200).json(result);
})

AtendimentoRoutes.post("/all",async(req,res)=>{
    const atendimentoRepository=new AtendimentoRepository();
    const {usuarioid, startdate, enddate}=req.body;
    //const usuarioid=Number(req.params.usuarioid);
    //const startdate=new Date(""+req.query.startdate);
    //const enddate=new Date(""+req.query.enddate);
    //console.log(userjson);
    const result=await atendimentoRepository.findMovimentacoesByUserIDAndDataRegistroBetweenDates(usuarioid, startdate,enddate);
    console.log({transactions:result});
    res.status(200).json({transactions:result??[]});
})



export {AtendimentoRoutes};