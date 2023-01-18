using System;
using System.ComponentModel.DataAnnotations.Schema;
using App.Components.GenericComponent.Interfaces;
using App.Components.UsersComponent.Enums;

namespace App.Models
{
    [Table("users")]
    public class User : IHaveId
    {
        [Column("id")]
        public long Id { get; set; }

        [Column("firstName")]
        public string FirstName { get; set; }

        [Column("surname")]
        public string Surname { get; set; }

        [Column("patronymic")]
        public string Patronymic { get; set; }

        [Column("country")]
        public string Country { get; set; }

        [Column("city")]
        public string City { get; set; }

        [Column("sex")]
        public SexEnum Sex { get; set; }

        [Column("birthDate")]
        public DateTime BirthDate { get; set; }
    }
}