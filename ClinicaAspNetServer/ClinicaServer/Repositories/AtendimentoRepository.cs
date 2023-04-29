using ClinicaServer.Models;
using System.Data.Entity;
using System.Linq.Expressions;

namespace ClinicaServer.Repositories
{
    public class AtendimentoRepository: RepositoryAbstract<Atendimento>, IAtendimentoRepository
    {

        public AtendimentoRepository(DBClinicaContext context) : base(context)
        {
            
        }

        public List<Atendimento> FindByConditionAndInclude(Expression<Func<Atendimento, bool>> expression, string relationinclude)

        {
            try
            {
                return context.Set<Atendimento>().Where(expression).Include(relationinclude).ToList<Atendimento>();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

    }
}
