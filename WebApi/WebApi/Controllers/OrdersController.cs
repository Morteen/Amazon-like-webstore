using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApi.Models;
using WebApi.Models.DTOModels;


namespace WebApi.Controllers
{

    [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
    public class OrdersController : ApiController
    {



        private Models.ApplicationDbContext db;

        public OrdersController()
        {
            db = new ApplicationDbContext();



        }



        // GET: api/Orders
        public IHttpActionResult Get()
        {

            var orderList = db.Orders.ToList();
            if (orderList == null)
            {
                return Content(HttpStatusCode.NotFound, "Noe er galt vi fant ingen ordre");
            }
            var dtoOrderList = new List<DtoOrder>();

            foreach (Orders order in orderList)
            {
                dtoOrderList.Add(DtoHelper.FromOrder_to_DtoOrder(db, order));
            }

            return Ok(dtoOrderList);
        }

        // GET: api/Orders/5
        public IHttpActionResult Get(int id)
        {
            
            var orderList = db.Orders.Where(o=>o.UserId==id).ToList();

            if (orderList == null)
            {
                return Content(HttpStatusCode.NotFound, "Denne bruker id'n er ikke tilknyttet noen ordre");
            }
            
            var dtoOrderList = new List<DtoOrder>();
            foreach (Orders order in orderList)
            {
                dtoOrderList.Add(DtoHelper.FromOrder_to_DtoOrder(db, order));
            }

            return Ok(dtoOrderList);
        }

        // POST: api/Orders
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Orders/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Orders/5
        public void Delete(int id)
        {
        }
    }
}
