using ClinicaServer.Models;

namespace ClinicaServer.Repositories
{
    public class ExamecovidRepository: RepositoryAbstract<Examecovid>, IExamecovidRepository
    {
        public ExamecovidRepository(DBClinicaContext context) : base(context) 
        {

        }
    }
}
