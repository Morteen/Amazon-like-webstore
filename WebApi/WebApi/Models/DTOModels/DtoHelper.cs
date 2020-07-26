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
                name = product.name,
                image = product.image,
                category = product.category,
                price = product.price,
                brand = product.brand,
                countInStock = product.countInStock,
                description = product.description
            };



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

        public static DtoOrder FormOrder_to_DtoOrder(ApplicationDbContext db,Orders order)
        {
            var dtoOrder = new DtoOrder();
            dtoOrder._Id = order.OrderId;
            dtoOrder.DeliveredAt = order.DeliveredAt;
            dtoOrder.IsDeliverd = order.IsDeliverd;
            dtoOrder.IsPaid = order.IsPaid;
            dtoOrder.PaidAt = order.PaidAt;
            dtoOrder.ItemsPrice = order.ItemsPrice;
            dtoOrder.Taxprice = order.Taxprice;
            dtoOrder.TotalPrice = order.TotalPrice;
            //Shipping
            Shipping shippingInfo = db.Shipping.Find(order.ShippingId);
            dtoOrder.Shipping.adress = shippingInfo.adress;
            dtoOrder.Shipping.city = shippingInfo.city;
            dtoOrder.Shipping.postalCode = shippingInfo.postalCode;
            dtoOrder.Shipping.country = shippingInfo.country;
            //payment Her må det legges data inni payment tabellen
            dtoOrder.Payment.paymentMethod = "Vipps";
            //orderitems
            List<Products> itemList = new List<Products>();
            itemList = db.Products.Where(p => p.productId == db.OrderToProduct.Where(o=>o.OrderId==order.OrderId).productId).ToList();// db.OrderToProduct.Where(otp => otp.OrderId == order.OrderId).Select(prod => prod.productId)).ToArray();
            dtoOrder.orderItems = ProductList_To_DtoList(itemList).ToArray();



            return dtoOrder;
        }


    }
}