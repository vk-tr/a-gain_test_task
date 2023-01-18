using System.Threading.Tasks;
using App.Components.GenericComponent.Dto;
using App.Components.GenericComponent.Extensions;
using App.DAL.Interfaces;
using App.Models;
using Microsoft.AspNetCore.Mvc;

namespace App.Components.UsersComponent.Controllers
{
    [ApiController]
    [Route("api/users/crud")]
    public class UsersCrudController : ControllerBase
    {
        private readonly IRepository<User> _repository;

        public UsersCrudController(
            IRepository<User> repository)
        {
            _repository = repository;
        }

        [HttpPost("getAllUsers")]
        public async Task<ActionResult<RequestBodyDto<User>>> GetAllUsers(
            RequestBodyDto<User> requestBodyDto)
        {
            requestBodyDto.Body = await _repository.GetAll();

            requestBodyDto = requestBodyDto.ListResult();

            return new ActionResult<RequestBodyDto<User>>(requestBodyDto);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(long id)
        {
            return await _repository.Get(id);
        }

        [HttpPut]
        public async Task<ActionResult<User>> UpdateUser(User user)
        {
            return await _repository.Update(user);
        }

        [HttpPost]
        public async Task<ActionResult<User>> CreateUser(User user)
        {
            return await _repository.Create(user);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> DeleteUser(long id)
        {
            return await _repository.Delete(id);
        }
    }
}