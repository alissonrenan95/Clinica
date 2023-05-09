using ClinicaServer.Dto;
using ClinicaServer.Models;
using ClinicaServer.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NuGet.Protocol;
using System.Collections;
using System.Collections.Generic;
using System.Data.Common;
using System.Reflection;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ClinicaServer.Controllers
{
    [Produces("application/json")]
    [Consumes("application/json")]
    [Route("api/[controller]/")]
    [ApiController]
    public class PacienteController : ControllerBase
    {
        private IRepositoryWrapper _repository;
        public PacienteController(IRepositoryWrapper repository)
        {
            _repository=repository;
        }

        [HttpGet]
        public List<Paciente> GetAll()
        {
            return _repository.Paciente.FindAll().ToList();
        }

        [HttpGet("{id}")]
        public List<Paciente> GetById(uint id)
        {
            return _repository.Paciente.FindByCondition(x=>x.Id==id).ToList<Paciente>();
        }

        [HttpGet("cpf/{cpf}")]
        public List<Paciente> GetByCpf(ulong cpf)
        {
            return _repository.Paciente.FindByCondition(x => x.Cpf == cpf).ToList<Paciente>();
        }



        [HttpGet("{pacienteid}/Atendimento/")]
        public List<Atendimento> GetAtendimentosByPaciente(uint pacienteid)
        {
            return _repository.Atendimento.FindByCondition(x => x.Pacienteid == pacienteid).OrderByDescending(x=>x.Datahoraatendimento).ToList<Atendimento>();
        }

        [HttpGet("{pacienteid}/Atendimento/{atendimentoid}")]
        public List<Atendimento> GetAtendimentoByPaciente(uint pacienteid, uint atendimentoid)
        {
            return _repository.Atendimento.FindByCondition(x => x.Pacienteid == pacienteid && x.Id==atendimentoid).ToList<Atendimento>();
        }

        [HttpGet("{pacienteid}/Atendimento/{atendimentoid}/Examegeral/")]
        public List<Examegeral> GetExamegeralByAtendimentoAndPaciente(uint pacienteid, uint atendimentoid)
        {
            return _repository.Examegeral.FindByCondition(x => x.Atendimentoid ==atendimentoid && x.Atendimento.Pacienteid == pacienteid).ToList<Examegeral>();
        }

        [HttpGet("{pacienteid}/Atendimento/{atendimentoid}/Examecovid/")]
        public List<Examecovid> GetExamecovidByAtendimentoAndPaciente(uint pacienteid, uint atendimentoid)
        {
            return _repository.Examecovid.FindByCondition(x => x.Atendimentoid == atendimentoid && x.Atendimento.Pacienteid == pacienteid).ToList<Examecovid>();
        }



        [HttpPost]
        public bool CreateOrUpdate([FromBody] Paciente paciente)
        {
            try
            {
                Console.WriteLine("teste");
                if (ModelState.IsValid)
                {
                    if (paciente.Id > 0)
                    {
                        return _repository.Paciente.update(paciente)>0;

                    }
                    else
                    {
                        return _repository.Paciente.create(paciente)>0;
                    }
                }
            }
            catch (Exception ex)
            {

            }
            Response.StatusCode = 400;
            return false;
        }


        [HttpPost("{pacienteid}/Atendimento/")]
        //public bool CreateAtendimentoByFuncionario([Bind("datahoraatendimento,concluido")] Atendimento atendimento, uint pacienteid)
        public bool CreateAtendimentoByFuncionario(uint pacienteid)
        {
            Atendimento atendimento = new Atendimento();
            atendimento.Concluido = false;
            atendimento.Datahoraatendimento = DateTime.Now;
            try{
                atendimento.Pacienteid = pacienteid;
                return _repository.Atendimento.create(atendimento)>0;
            }   
            catch(Exception e)
            {

            }
            Response.StatusCode = 400;
            return false;
        }


        [HttpPost("{pacienteid}/Atendimento/{atendimentoid}")]
        public bool UpdateAtendimentoByFuncionarioAndAtendimento(uint pacienteid, uint atendimentoid)
        {
            
            try
            {
                Atendimento atendimento = _repository.Atendimento.FindByCondition(x => x.Id == atendimentoid && x.Pacienteid == pacienteid && x.Concluido == false).ToList<Atendimento>().ElementAt<Atendimento>(0);
                atendimento.Concluido = true;
                return _repository.Atendimento.update(atendimento) > 0;
            }
            catch (Exception e)
            {

            }
            Response.StatusCode = 400;
            return false;
        }



        [HttpPost("{pacienteid}/Atendimento/{atendimentoid}/Examegeral/")]
        public bool CreateExamegeralByFuncionarioAndAtendimento([Bind("Pressaosistolica,Pressaodiastolica,Pulsacao,Respiracao,Temperatura")] Examegeral examegeral, uint pacienteid, uint atendimentoid)
        {
            examegeral.Concluido = true;
            examegeral.Atendimentoid=atendimentoid;
            try
            {
                return _repository.Examegeral.create(examegeral) > 0;
            }
            catch (Exception e)
            {

            }
            Response.StatusCode = 400;
            return false;
        }




        [HttpPost("{pacienteid}/Atendimento/{atendimentoid}/Examecovid/")]
        public bool CreateExamecovidByFuncionarioAndAtendimento([FromBody] Examecovid examecovid, uint pacienteid, uint atendimentoid)
        {
            examecovid.Concluido = true;
            examecovid.Atendimentoid = atendimentoid;
            try
            {
                return _repository.Examecovid.create(examecovid) > 0;
            }
            catch (Exception e)
            {

            }
            Response.StatusCode = 400;
            return false;
        }

        [HttpGet("relatorio")]
        public List<Relatorio> GetReportData()
        {
            try
            {
                List<Relatorio> listarelatorio=new List<Relatorio>();
                _repository.getContext().Database.OpenConnection();
                DbConnection connect=_repository.getContext().Database.GetDbConnection();
                
                var command = connect.CreateCommand();
                command.CommandText = "select YEAR(a.datahoraatendimento) as ano,MONTH(a.datahoraatendimento) as mes, count(a.id) as totalatendimentos, count(case when ec.febre+ec.coriza+ec.narizentupido+ec.cansaco+ec.tosse+ec.dordecabeca+ec.doresnocorpo+ec.malestargeral+ec.dordegarganta+ec.dificuldadederespirar+ec.faltadepaladar+ec.faltadeolfato+ec.dificuldadedelocomocao+ec.diarreia*100/14>5 then 1 end)-count(case when ec.febre+ec.coriza+ec.narizentupido+ec.cansaco+ec.tosse+ec.dordecabeca+ec.doresnocorpo+ec.malestargeral+ec.dordegarganta+ec.dificuldadederespirar+ec.faltadepaladar+ec.faltadeolfato+ec.dificuldadedelocomocao+ec.diarreia*100/14>8 then 1 end) as totalpossivelmenteinfectados, count(case when ec.febre+ec.coriza+ec.narizentupido+ec.cansaco+ec.tosse+ec.dordecabeca+ec.doresnocorpo+ec.malestargeral+ec.dordegarganta+ec.dificuldadederespirar+ec.faltadepaladar+ec.faltadeolfato+ec.dificuldadedelocomocao+ec.diarreia*100/14>8 then 1 end) as totalpotencialmenteinfectados from atendimento a, examecovid ec where ec.atendimentoid=a.id group by ano,mes";
                DbDataReader reader=command.ExecuteReader();
                while (reader.Read())
                {
                    Relatorio relatorio = new Relatorio();
                    relatorio.ano=reader.GetInt32(0);
                    relatorio.mes =reader.GetInt32(1);
                    relatorio.totalatendimentos = reader.GetInt64(2);
                    relatorio.totalpossivelmenteinfectados = reader.GetInt64(3);
                    relatorio.totalpotencialmenteinfectados = reader.GetInt64(4);
                    listarelatorio.Add(relatorio);

                }
                _repository.getContext().Database.CloseConnection();


                return listarelatorio;
                

            }
            catch (Exception e)
            {
                return null;
            }


            //return _repository.Paciente.FindAll().ToList<object>();
        }

    }
}
