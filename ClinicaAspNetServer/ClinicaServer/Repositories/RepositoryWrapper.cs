using ClinicaServer.Models;
using System.Security.Cryptography.X509Certificates;

namespace ClinicaServer.Repositories
{
    public class RepositoryWrapper: IRepositoryWrapper
    {
        private DBClinicaContext _context;
        private IAtendimentoRepository _atendimentoRepository;
        private IExamecovidRepository _examecovidRepository;
        private IExamegeralRepository _examegeralRepository;
        private IPacienteRepository _pacienteRepository;

        public IAtendimentoRepository Atendimento
        {
            get
            {
                if (_atendimentoRepository == null)
                {
                    _atendimentoRepository = new AtendimentoRepository(_context);
                }
                return _atendimentoRepository;
            }
        }
        public IExamecovidRepository Examecovid
        {
            get
            {
                if (_examecovidRepository == null)
                {
                    _examecovidRepository = new ExamecovidRepository(_context);
                }
                return _examecovidRepository;
            }
        }
        public IExamegeralRepository Examegeral
        {
            get
            {
                if (_examegeralRepository == null)
                {
                    _examegeralRepository = new ExamegeralRepository(_context);
                }
                return _examegeralRepository;
            }
        }
        public IPacienteRepository Paciente
        {
            get
            {
                if (_pacienteRepository == null)
                {
                    _pacienteRepository = new PacienteRepository(_context);
                }
                return _pacienteRepository;
            }
        }



        public RepositoryWrapper(DBClinicaContext context)
        {
            _context=context;
        }
        public int save()
        {
            return _context.SaveChanges();
        }
        public DBClinicaContext getContext()
        {
            return _context;
        }


    }
}
