using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApi.Models;
using System.Web.Http.Cors;

namespace WebApi.Controllers
    
{
    [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
    public class PaymentConfigController : ApiController
    {
       
        // GET: api/PaymentConfig
        public IHttpActionResult Get()
        {
            var Paypal = new PaymentConfig();
            Paypal.clientID = "ATeP6-3U_7VqZH1E1PI00z6-W4R3GraTkM0PUW5QGXIt_W8SFBXCsy8uIUW0zmiJut7-gkhp2AFIo_Lt";
            var PaypalBuisness = new PaymentConfig { clientID = "ARADpfI3AFhDI9dYkFe-13tvLGYmtVQuR17bqF62DGTo_xegU1nqST7OfJXe3KmgUczLkbXzZj0nu99o" };

            return Ok(Paypal);
        }

        // GET: api/PaymentConfig/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/PaymentConfig
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/PaymentConfig/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/PaymentConfig/5
        public void Delete(int id)
        {
        }
    }
}
