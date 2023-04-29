using ClinicaServer.Models;

namespace ClinicaServer.Repositories
{
    public interface IRepositoryWrapper
    {
        IAtendimentoRepository Atendimento { get; }
        IExamecovidRepository Examecovid { get; }
        IExamegeralRepository Examegeral { get; }
        IPacienteRepository Paciente { get; }

        public int save();
        public DBClinicaContext getContext();
    }

}
