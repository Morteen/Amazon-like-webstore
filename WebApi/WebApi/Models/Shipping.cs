using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApi.Models
{
    public class Shipping
    {
        [Key]
        public int ShippingId { get; set; }
      



        [Required] public string adress { get; set; }

        public string city { get; set; }
        public string postalCode { get; set; }
        public string country { get; set; }


        //[ForeignKey("Orders")]
        public int OrderId { get; set; }
        //public virtual ICollection <Orders>Orders { get; set; }
    }
}