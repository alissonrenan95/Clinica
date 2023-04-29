using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using ClinicaServer.Models;
using ClinicaServer.Repositories;
using System.Linq.Expressions;
using ClinicaServer.Hubs;

namespace ClinicaServer.Controllers
{
    [Consumes("application/json")]
    [Produces("application/json")]
    [Route("api/[controller]/")]
    [ApiController]
    public class AtendimentoController : ControllerBase
    {
        private IRepositoryWrapper _repository;
        public AtendimentoController(IRepositoryWrapper repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public List<Atendimento> GetAtendimentos()
        {
            //return _repository.Atendimento.FindAll().OrderByDescending(x => x.Datahoraatendimento).ToList<Atendimento>();
            List<Atendimento> lista= _repository.Atendimento.FindByConditionAndInclude(x=>x.Id==x.Id, "Examecovid").OrderByDescending(x => x.Datahoraatendimento).ToList<Atendimento>();
            //Console.WriteLine("id paciente="+lista.First().Paciente.Id);
            return lista;
        }

        [HttpGet("{id}")]
        public List<Atendimento> Get(uint id)
        {
            return _repository.Atendimento.FindByCondition(x => x.Id == id).ToList<Atendimento>();
        }

        [HttpPost]
        public bool CreateOrUpdate([Bind("Id,Pacienteid,Datahoraatendimento,Concluido")] Atendimento atendimento)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    if (atendimento.Id > 0)
                    {
                        return _repository.Atendimento.update(atendimento) > 0;

                    }
                    else
                    {
                        return _repository.Atendimento.create(atendimento) > 0;
                        
                    }
                }
            }
            catch (Exception ex)
            {

            }
            Response.StatusCode = 400;
            return false;
        }


        [HttpDelete]
        public bool Delete(uint id)
        {
            if (_repository.Atendimento == null)
            {
                Response.StatusCode = 400;
                return false;
            }
            var atendimento = _repository.Atendimento.FindByCondition(x=>x.Id==id).First<Atendimento>();
            if (atendimento != null)
            {
                _repository.Atendimento.delete(atendimento);
                int linhasafetadas = _repository.save();
                if (linhasafetadas > 0)
                {
                    return true;
                }
            }
            Response.StatusCode = 400;
            return false;

        }

    }
}
