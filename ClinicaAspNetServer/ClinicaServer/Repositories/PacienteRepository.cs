using ClinicaServer.Models;

namespace ClinicaServer.Repositories
{
    public class PacienteRepository: RepositoryAbstract<Paciente>, IPacienteRepository
    {
        public PacienteRepository(DBClinicaContext context)
            :base(context)
        {

        }
    }
}
