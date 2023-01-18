using System.Collections.Generic;
using System.Threading.Tasks;
using App.DAL.DbContexts;
using App.DAL.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace App.DAL.Repositories
{
    public class Repository<TEntity> : IRepository<TEntity>
        where TEntity : class, new()
    {
        private readonly AppDbContext _appDbContext;

        public Repository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<IEnumerable<TEntity>> GetAll()
        {
            return await _appDbContext.Set<TEntity>().ToListAsync();
        }

        public async Task<TEntity> Get(long id)
        {
            return await _appDbContext.Set<TEntity>().FindAsync(id);
        }

        public async Task<TEntity> Create(TEntity entity)
        {
            await _appDbContext.Set<TEntity>().AddAsync(entity);
            await _appDbContext.SaveChangesAsync();

            return entity;
        }

        public async Task<TEntity> Update(TEntity entity)
        {
            _appDbContext.Set<TEntity>().Update(entity);
            await _appDbContext.SaveChangesAsync();

            return entity;
        }

        public async Task<TEntity> Delete(long id)
        {
            var entityToDelete = await Get(id);

            if (entityToDelete == null)
            {
                return new TEntity();
            }

            _appDbContext.Set<TEntity>().Remove(entityToDelete);
            await _appDbContext.SaveChangesAsync();

            return entityToDelete;
        }
    }
}