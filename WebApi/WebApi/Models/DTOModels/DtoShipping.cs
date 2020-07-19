using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApi.Models.DTOModels
{
    public class DtoShipping
    {
        public string adress { get; set; }
        public string city { get; set; }
        public string postalCode { get; set; }
        public string country { get; set; }
    }
}
/*,"shipping":{"adress":"Gautesvei 9","city":"Skien","postalCode":"3731"}*/
