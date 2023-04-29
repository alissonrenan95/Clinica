using System.Linq.Expressions;

namespace ClinicaServer.Repositories
{
    public interface IRepository<T>
    {
        
        IQueryable<T> FindAll(); //result is empty? return null
        IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression); //result is empty? return null

        IQueryable<T> FindByConditionAndInclude(Expression<Func<T, bool>> expression, string relationinclude);

        //created id should be returned; if not created, return 0
        int create(T entity);
        //rows affected should be returned; if not updated, return 0
        int update(T entity);
        //rows affected should be returned; if not deleted, return 0
        int delete(T entity);
       
    }
}
