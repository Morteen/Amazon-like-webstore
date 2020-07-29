using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApi.Models.DTOModels
{
    public class DtoUserInfo
    {
        public int UserId { get; set; }
        public string name { get; set; }
        public string email  { get; set; }
        public string password { get; set; }
        public bool isAdmin { get; set; }

    }
}

