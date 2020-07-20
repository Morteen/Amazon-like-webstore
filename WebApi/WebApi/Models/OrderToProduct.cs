using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using WebApi.Models;

namespace WebApi.Models
{
    public class OrderToProduct
    {[Key]
        public int OrderToProductId { get; set; }
      //  [ForeignKey("Products")]
        public int productId { get; set; }

        public int OrderId { get; set; }


       // public virtual Products Products { get; set; }
        //public virtual Orders Orders { get; set; }
    }
}