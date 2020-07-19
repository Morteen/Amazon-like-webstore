using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApi.Models;
using WebApi.Models.DTOModels;

namespace WebApi.Controllers.DTOControllers
{






    [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]

    public class DtoOrderController : ApiController
    {

        private Models.ApplicationDbContext db;

        public DtoOrderController()
        {
            db = new ApplicationDbContext();



        }



        // GET: api/DtoOrder
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/DtoOrder/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/DtoOrder
        public IHttpActionResult Post([FromBody]DtoOrder order)

        {
            var order1 = new Orders();
            List<int> temp = new List<int>();
            var test = db.Shipping.SingleOrDefault(x => x.adress == order.Shipping.adress && x.city == order.Shipping.city && x.country == order.Shipping.country);
            if (test == null) {
                var ship = new Shipping { adress = order.Shipping.adress, city = order.Shipping.city, country = order.Shipping.country };
                db.Shipping.Add(ship);
                db.SaveChanges();
                order1.ShippingId = db.Shipping.SingleOrDefault(x => x.adress == ship.adress && x.city == ship.city && x.country == ship.country).ShippingId;
            }
            else
            {
                order1.ShippingId = test.ShippingId;
            }
           
          
            //Mapper DTO over til orders
            order1.ItemsPrice = order.ItemsPrice;
             for (int i=0;i< order.orderItems.Length;i++)
             {
                 temp.Add(order.orderItems[i].product);
             };
            order1.ItemIds= temp;
            order1.Taxprice = order.Taxprice;
            order1.UserId = order.UserInfo.id;
           
            
            
           if(order1.ItemIds.Count < 1)
            {
                return Content(HttpStatusCode.NotFound, "Denne orderen ble ikke lagret");
            }
           
            


            return Ok("Hei");
        }

        // PUT: api/DtoOrder/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/DtoOrder/5
        public void Delete(int id)
        {
        }
    }
}
