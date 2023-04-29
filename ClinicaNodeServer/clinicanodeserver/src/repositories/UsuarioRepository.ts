/*
import {PrismaClient, usuario} from "@prisma/client";
class UsuarioController{
    private prisma: PrismaClient;
    constructor(){
        this.prisma = new PrismaClient();
    }
    async create(data:Omit<usuario, "id">){
        try{
            return await this.prisma.usuario.create({
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

    async delete(usuarioid:number){
        try{
            return await this.prisma.usuario.delete({
                where:{
                    id:usuarioid
                }
            })
        }
        catch(e){
            return e;
        }
    }


    async findUsuarioByUsernameAndPassword(username: string, password: string){
        try{
            const usuariologado = await this.prisma.usuario.findFirst({
                where: {
                    AND: [{
                        nomeusuario:{
                            equals:username,
                        },
                        senha:{
                            equals:password
                        },
                    }]
                },
                select:{
                    id: true,
                    nomeusuario: true,
                    email: true,
                },
                
            });
            
            const retorno= await JSON.stringify(usuariologado);
            console.log(usuariologado);
            return retorno;
        }
        catch(e){
            return e;
        }
    }
    async findUsuarioByEmailAndPassword(email: string, password: string){
        try{
            const usuariologado = await this.prisma.usuario.findFirst({
                where: {
                    AND: [{
                        email:{
                            equals:email,
                        },
                        senha:{
                            equals:password
                        },
                    }]
                },
                select:{
                    id: true,
                    nomeusuario: true,
                    email: true,
                },
                
            });
            return usuariologado;
        }
        catch(e){
            return e;
        }
    }
}
export default UsuarioController;
*/