using ClinicaServer.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data.Entity;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ClinicaServer.Controllers
{
    [Consumes("application/json")]
    [Produces("application/json")]
    [Route("api/atendimento/{atendimentoid}/[controller]")]
    [ApiController]
    public class ExamegeralController : ControllerBase
    {
        private readonly DBClinicaContext _context;

        public ExamegeralController(DBClinicaContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public List<Examegeral> GetByAtendimentoAndExame(uint? id, uint atendimentoid)
        {
            var examegeral = _context.Examegeral.Where(e => e.Atendimentoid == atendimentoid && e.Id == id).ToList<Examegeral>();
            return examegeral;

        }



        [HttpGet]
        public List<Examegeral> GetByAtendimento(uint atendimentoid)
        {
            var examegeral = _context.Examegeral.Where(e => e.Atendimentoid == atendimentoid).ToList<Examegeral>();
            return examegeral;
        }

        [HttpPost]
        public async Task<Examegeral> CreateOrUpdate([FromBody] Examegeral examegeral)
        {
            if (ModelState.IsValid)
            {
                if (examegeral.Id > 0)
                {
                    _context.Update(examegeral);
                }
                else
                {
                    _context.Add(examegeral);
                }
                await _context.SaveChangesAsync();
                return examegeral;
            }
            Response.StatusCode = 400;
            return null;
        }


        [HttpDelete]
        public async Task<Boolean> Delete(uint id)
        {
            if (_context.Examegeral == null)
            {
                Response.StatusCode = 400;
                return false;
            }
            var examegeral = await _context.Examegeral.FindAsync(id);
            if (examegeral != null)
            {
                _context.Examegeral.Remove(examegeral);
                await _context.SaveChangesAsync();
                Response.StatusCode = 200;
                return true;
            }

            Response.StatusCode = 400;
            return false;

        }
    }
}
