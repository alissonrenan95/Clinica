using ClinicaServer.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data.Entity;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ClinicaServer.Controllers
{
    [Consumes("application/json")]
    [Produces("application/json")]
    [Route("api/atendimento/{atendimentoid}/examecovid")]
    [ApiController]
    public class ExamecovidController : ControllerBase
    {
        private readonly DBClinicaContext _context;

        public ExamecovidController(DBClinicaContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public List<Examecovid> GetByAtendimentoAndExame(uint? id, uint atendimentoid)
        {
            var examecovid = _context.Examecovid.Where(e => e.Atendimentoid == atendimentoid && e.Id == id).ToList<Examecovid>();
            return examecovid;
            
        }

        

        [HttpGet]
        public List<Examecovid> GetByAtendimento(uint atendimentoid)
        {
            var examecovid = _context.Examecovid.Where(e => e.Atendimentoid == atendimentoid).ToList<Examecovid>();
            return examecovid;
        }

        [HttpPost]
        public async Task<Examecovid> CreateOrUpdate([FromBody] Examecovid examecovid)
        {
            if (ModelState.IsValid)
            {
                if (examecovid.Id > 0)
                {
                    _context.Update(examecovid);
                }
                else
                {
                    _context.Add(examecovid);
                }
                await _context.SaveChangesAsync();
                return examecovid;
            }
            Response.StatusCode = 400;
            return null;
        }


        [HttpDelete]
        public async Task<Boolean> Delete(uint id)
        {
            if (_context.Examecovid == null)
            {
                Response.StatusCode = 400;
                return false;
            }
            var examecovid = await _context.Examecovid.FindAsync(id);
            if (examecovid != null)
            {
                _context.Examecovid.Remove(examecovid);
                await _context.SaveChangesAsync();
                Response.StatusCode = 200;
                return true;
            }

            Response.StatusCode = 400;
            return false;

        }
    }
}
