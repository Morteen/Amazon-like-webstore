using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApi.Models
{
    public class Reviews
    {[Key]
        public int _Id { get; set; }
        public int productId { get; set; }
        public string  name { get; set; }
        public int rating { get; set; }
        public string comment { get; set; }
    }
}