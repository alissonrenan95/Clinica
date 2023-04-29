using ClinicaServer.Models;

namespace ClinicaServer.Repositories
{
    public class InternacaoRepository : RepositoryAbstract<Atendimento>
    {
        public InternacaoRepository(DBClinicaContext context) : base(context)
        {
        }
    }
}
