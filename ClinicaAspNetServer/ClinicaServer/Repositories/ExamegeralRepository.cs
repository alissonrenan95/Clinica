using ClinicaServer.Models;

namespace ClinicaServer.Repositories
{
    public class ExamegeralRepository: RepositoryAbstract<Examegeral>, IExamegeralRepository
    {
        public ExamegeralRepository(DBClinicaContext context) : base(context)
        {

        }
    }
}
