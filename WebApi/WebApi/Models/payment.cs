using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApi.Models
{
    public class Payment
    {
        [Key]
        public int PaymentId { get; set; }
       

        [Required]
        public string paymentMethod { get; set; }

        //Foregin key
       // public int OrderId { get; set; }
       // public virtual ICollection<Orders> Orders { get; set; }

    }
}