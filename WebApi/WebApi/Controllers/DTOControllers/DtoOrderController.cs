﻿using System;
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
        public IHttpActionResult  Get()
        {
            var orderlist = db.Orders.ToList();
            return Ok();
        }

        // GET: api/DtoOrder/5
        public IHttpActionResult Get(int id)
        {
            var order = db.Orders.Find(id);
            if (order == null)
            {
                return NotFound();
            }
       var dtoOrder= DtoHelper.FromOrder_to_DtoOrder(db,order);
          



            return Ok(dtoOrder);
        }

        // POST: api/DtoOrder
        public IHttpActionResult Post([FromBody]DtoOrder order)

        {


            if (order == null)
            {
                return NotFound();
            }


            var newOrder = new Orders();
            List<int> productId_for_OrderToProduct = new List<int>();
            var test = db.Shipping.SingleOrDefault(x => x.adress == order.Shipping.adress && x.city == order.Shipping.city && x.country == order.Shipping.country);
            if (test == null) {
                var ship = new Shipping { adress = order.Shipping.adress, city = order.Shipping.city, country = order.Shipping.country };
                db.Shipping.Add(ship);
                db.SaveChanges();
                newOrder.ShippingId = db.Shipping.SingleOrDefault(x => x.adress == ship.adress && x.city == ship.city && x.country == ship.country).ShippingId;
            }
            else
            {
                newOrder.ShippingId = test.ShippingId;
            }


            //Mapper DTO over til orders og skaffer productid til orderToProduct
            newOrder.ItemsPrice = order.ItemsPrice;
             for (int i=0;i< order.orderItems.Length;i++)
             {
                productId_for_OrderToProduct.Add(order.orderItems[i].product);
             };

            newOrder.Taxprice = order.Taxprice;
            newOrder.UserId = order.UserInfo.UserId;
            newOrder.TotalPrice = order.TotalPrice;
            newOrder.ShippingPrice = order.ShippingPrice;
            newOrder.CreatedAt = DateTime.Now;
            newOrder.PaymentId = 1;
           
            
            
           if(newOrder==null)
            {
                return Content(HttpStatusCode.NotFound, "Denne orderen ble ikke lagret");
            }
            db.Orders.Add(newOrder);
            db.SaveChanges();
            //Finner id for den nye orderen
            var newOrderId = db.Orders.Max(x => x.OrderId);
            //Legger inn ordreId og productId inn i ordreToProduct
            foreach (int id in productId_for_OrderToProduct)
            {
                db.OrderToProduct.Add(new OrderToProduct { OrderId = newOrderId, productId = id });
                db.SaveChanges();
            }
            //Lager product liste for response på createProduct
            var tempList = db.OrderToProduct.Where(x => x.OrderId == newOrderId).ToList();
          
            var productResponseList = new List<DtoProducts>();
            foreach(OrderToProduct prod in tempList)
            {
                productResponseList.Add( DtoHelper.Product_To_DtoProd(db.Products.SingleOrDefault(x=>x.productId==prod.productId)));
            }
            //lager et object for å sende tilbake som bekreftelse
            var DtoResponseOrder = new DtoOrder
            {
                _Id = newOrderId,
                UserInfo = new DtoUserInfo { UserId = order.UserInfo.UserId, name = order.UserInfo.name, email = order.UserInfo.email },
                orderItems = productResponseList.ToArray(),
                Shipping = new DtoShipping { adress = order.Shipping.adress, city = order.Shipping.city },
                ItemsPrice = order.ItemsPrice,
                ShippingPrice = order.ShippingPrice,
                Taxprice = order.Taxprice,
                TotalPrice = order.TotalPrice,
                CreatedAt = DateTime.Now.ToString(),
            };
            if (DtoResponseOrder == null)
            {
                return Content(HttpStatusCode.NotFound, "Denne orderen ble ikke lagret");
            }


            return Ok(DtoResponseOrder);
        }

        // PUT: api/DtoOrder/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/DtoOrder/5
        [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
        public IHttpActionResult Delete(int id)
        {
            var order = db.Orders.Find(id);
            if (order == null)
            {
                  return Content(HttpStatusCode.NotFound, "Beklager denne orderen finner vi ikke");
            }

            db.Orders.Remove(order);
            db.SaveChanges();
            var DtoDeletedOrder = DtoHelper.FromOrder_to_DtoOrder(db,order);
            return Ok(DtoDeletedOrder);

        }
    }
}
