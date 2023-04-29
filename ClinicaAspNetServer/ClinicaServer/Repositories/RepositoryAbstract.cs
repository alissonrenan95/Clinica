using ClinicaServer.Models;
using System.Data.Entity;
using System.Linq.Expressions;

namespace ClinicaServer.Repositories
{
    public abstract class RepositoryAbstract<T> : IRepository<T> where T : class
    {
        public DBClinicaContext context { get; set; }

        public RepositoryAbstract(DBClinicaContext _context)
        {
            context = _context;
        }

        


        public int create(T entity)
        {
            try
            {
                context.Set<T>().Add(entity);
                return context.SaveChanges();
            }
            catch(Exception e)
            {
                return 0;
            }
        }

        public int update(T entity)
        {
            try
            {
                context.Set<T>().Update(entity);
                return context.SaveChanges();
            }
            catch (Exception e)
            {
                return 0;
            }
        }

        public int delete(T entity)
        {
            try
            {
                context.Set<T>().Remove(entity);
                return context.SaveChanges();
            }
            catch (Exception e)
            {
                return 0;
            }
        }

        public IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression)
           
        {
            try
            {
                return context.Set<T>().Where(expression).AsNoTracking();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public IQueryable<T> FindByConditionAndInclude(Expression<Func<T, bool>> expression, string relationinclude)

        {
            try
            {
                return context.Set<T>().Where(expression).Include(relationinclude).AsNoTracking();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public IQueryable<T> FindAll()
        {
            try
            {
                return context.Set<T>().AsNoTracking();
            }
            catch(Exception ex)
            {
                return null;
            }
        }



        
    }
}
