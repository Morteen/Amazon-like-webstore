using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApi.Models.DTOModels
{
    public class DtoPayment
    {
        public int _id { get; set; }


        
        public string paymentMethod { get; set; }
    }
}