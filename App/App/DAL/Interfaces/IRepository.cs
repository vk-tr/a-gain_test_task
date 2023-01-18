using System.Collections.Generic;
using System.Threading.Tasks;

namespace App.DAL.Interfaces
{
    public interface IRepository<TEntity>
    {
        Task<IEnumerable<TEntity>> GetAll();

        Task<TEntity> Get(long id);

        Task<TEntity> Create(TEntity item);

        Task<TEntity> Update(TEntity item);

        Task<TEntity> Delete(long id);
    }
}