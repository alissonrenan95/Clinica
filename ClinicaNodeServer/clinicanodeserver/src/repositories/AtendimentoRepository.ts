import {PrismaClient, atendimento} from "@prisma/client";
class AtendimentoRepository{
    private prisma: PrismaClient;
    constructor(){
        this.prisma = new PrismaClient();
    }
    async create(data:Omit<atendimento, "id">){
        try{
            return await this.prisma.atendimento.create({
                data: {
                    ...data,
                },
                select: {
                    id:true
                }
            })
        }
        catch(e){
            return e;
        }
    }

    //Somente o status de concluido do atendimento pode ser alterado
    async update(data:atendimento){
        try{
            return await this.prisma.atendimento.update({
                data: {
                    concluido:data.concluido
                },
                where:{
                    id:data.id
                }
            })
        }
        catch(e){
            return e;
        }
    }
    //utilizar em funcionalidade de desistencia ou atendimento incompleto
    async delete(atendimentoid:number){
        try{
            return await this.prisma.atendimento.delete({
                where:{
                    id:atendimentoid,
                }
            })
        }
        catch(e){
            return e;
        }
    }


    
    async findAtendimentos(){
        try{
            return await this.prisma.atendimento.findMany({
                select:{
                    id: true,
                    datahoraatendimento: true,
                    pacienteid: true,
                    concluido: true
                },
                orderBy:{
                    datahoraatendimento:"desc"
                }
                
            });
            
        }
        catch(e){
            return e;
        }
    }
    async findAtendimentosByPacienteId(pacienteid:number){
        try{
            return await this.prisma.atendimento.findMany({
                where: {
                    AND: {
                        pacienteid:pacienteid,
                    }
                },
                select:{
                    id: true,
                    datahoraatendimento: true,
                    pacienteid: true,
                    concluido: true
                },
                orderBy:{
                    datahoraatendimento:"desc"
                }
                
            });
            
        }
        catch(e){
            return e;
        }
    }
    async findAtendimentosByPacienteIdAndDataAtendimentoBetweenDates(pacienteid:number, startdate: Date, enddate: Date){
        try{
            return await this.prisma.atendimento.findMany({
                where: {
                    AND: {
                        pacienteid:pacienteid,
                        datahoraatendimento:{
                            lte:enddate,
                            gte:startdate
                        }
                    }
                },
                select:{
                    id: true,
                    datahoraatendimento: true,
                    pacienteid: true,
                    concluido: true
                },
                orderBy:{
                    datahoraatendimento:"desc"
                }
                
            });
            
        }
        catch(e){
            return e;
        }
    }

    
    
    
}
export default AtendimentoRepository;