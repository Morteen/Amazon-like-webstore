using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebApiVol2.Models.DTOModels
{
    public class DtoOrdersController : ApiController
    {
        // GET: api/DtoOrders
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/DtoOrders/5
        public string Get(int id)
        {
            return "value";
        }
        public string MultiParam(int id,int id2)
        {
            return "value from multi param";
        }


        // POST: api/DtoOrders
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/DtoOrders/5
        public DtoOrders Put(int id, [FromBody]DtoOrders order)
        {
            return order;
        }

        // DELETE: api/DtoOrders/5
        public void Delete(int id)
        {
        }

        
    }
}
