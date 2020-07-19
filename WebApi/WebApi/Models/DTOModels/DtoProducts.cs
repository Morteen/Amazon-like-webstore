using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApi.Models.DTOModels
{
    public class DtoProducts
    {
        public int product { get; set; }
        public int _id{ get; set; }
        public string name { get; set; }
        public string image { get; set; }
        public string category { get; set; }
        public double price { get; set; }
        public string brand { get; set; }
        public double rating { get; set; }
        public int numRew { get; set; }
        public int countInStock { get; set; }
        public string description { get; set; }

    }
}