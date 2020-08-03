using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApi.Models.DTOModels
{
    public class DtoHelper
    {

        private Models.ApplicationDbContext db;

        public DtoHelper()
        {
            db = new ApplicationDbContext();



        }




        public static DtoProducts Product_To_DtoProd(Products product)
        {

            DtoProducts DtoProd = new DtoProducts
            {
                _id = product.productId,
                product = product.productId,
                name = product.name,
                image = product.image,
                category = product.category,
                price = product.price,
                brand = product.brand,
            
                numRew=product.numRew,
                countInStock = product.countInStock,
                description = product.description
            };
            if (product.rating >= 1 && product.numRew >= 1) {
                DtoProd.rating = product.rating / product.numRew;

            }
            else { DtoProd.rating = 0; }



            return DtoProd;
        }

        public static Products FromDtoProduct_To_Product(DtoProducts DtoProd)
        {
          
            var prod = new Products {
                productId=DtoProd._id,
                name = DtoProd.name,
                price =DtoProd.price,
                image =DtoProd.image,
                brand =DtoProd.brand,
                category =DtoProd.category,
                countInStock =DtoProd.countInStock,
                description=DtoProd.description
            };
          
            return prod;
        }


       



        public static List<DtoProducts> ProductList_To_DtoList(List<Products> productList)
        {
            var DtoList = new List<DtoProducts>();
            foreach(var item in productList)
            {
                DtoList.Add(Product_To_DtoProd(item));
            }
            return DtoList;
        }



        //Order

        public static DtoOrder FromOrder_to_DtoOrder(ApplicationDbContext db,Orders order)
        {
            var dtoOrder = new DtoOrder();
            dtoOrder._Id = order.OrderId;
            dtoOrder.DeliveredAt = order.DeliveredAt;
            dtoOrder.IsDeliverd = order.IsDeliverd;
            dtoOrder.IsPaid = order.IsPaid;
            dtoOrder.PaidAt = order.PaidAt;
            dtoOrder.ItemsPrice = order.ItemsPrice;
            dtoOrder.Taxprice = order.Taxprice;
            dtoOrder.ShippingPrice = order.ShippingPrice;
            dtoOrder.TotalPrice = order.ShippingPrice + order.ItemsPrice;
            if (order.CreatedAt == null)
            {
                dtoOrder.CreatedAt = DateTime.Now.ToString();
            }
            else
            {
                dtoOrder.CreatedAt = order.CreatedAt.ToShortDateString();
            }
            
            //Shipping
           
           var shippingInfo = db.Shipping.SingleOrDefault(s=>s.ShippingId==1);
            if (shippingInfo != null) {
                var newShipping = new DtoShipping();
                newShipping.adress = shippingInfo.adress;
                newShipping.city = shippingInfo.city;
                newShipping.postalCode = shippingInfo.postalCode;
                newShipping.country = shippingInfo.country;
                dtoOrder.Shipping = newShipping;
               
            }

            //payment Her må det legges data inni payment tabellen
            var newPayment = new DtoPayment();
            newPayment.paymentMethod= "Vipps";
            dtoOrder.payment = newPayment;
            //orderitems
              List<Products> itemList = new List<Products>();
              //List<int>temList = new List<int>();
              var tempList = db.OrderToProduct.Where(x => x.OrderId == order.OrderId).ToList();
              foreach(OrderToProduct item in tempList)
              {
                  itemList.Add(db.Products.Find(item.productId));
              }

             // itemList = db.Products.Where(p => p.productId == db.OrderToProduct.Where(o=>o.OrderId==order.OrderId).productId).ToList();// db.OrderToProduct.Where(otp => otp.OrderId == order.OrderId).Select(prod => prod.productId)).ToArray();
              dtoOrder.orderItems = ProductList_To_DtoList(itemList).ToArray();

            //userInfo  
            var user = db.Users.Find(order.UserId);
            if (user != null)
            {

                var userInfo = new DtoUserInfo();
                userInfo.name = user.name;
                userInfo.email = user.email;
                dtoOrder.UserInfo = userInfo;
            }

            return dtoOrder;
        }


    }
}