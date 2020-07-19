using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations; 
using System.ComponentModel;

using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Models
{
    public class Users
    {
        [Key]
        public int UserId { get; set; }
        


        public string name { get; set; }
        public string email{ get; set; }
        public string password { get; set; }
        [DefaultValue(false)]
        public bool isAdmin{ get; set; }


        // Foreign Keys
        //[ForeignKey("Orders")]
       // public int OrderId { get; set; }
        //public virtual ICollection<Orders> Orders { get; set; }


    }
}