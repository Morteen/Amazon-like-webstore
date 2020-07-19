using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;

namespace WebApi.Models.DTOModels
{
    public class DtoOrder
    {
        public int _Id { get; set; }
        public DtoUserInfo UserInfo { get; set; }
       public  DtoShipping Shipping { get; set; }

        public DtoProducts[] orderItems { get; set; }


        public double ItemsPrice { get; set; }
        public double Taxprice { get; set; }
        public double ShippingPrice { get; set; }
        public double TotalPrice { get; set; }
        [DefaultValue(false)]
        public bool IsPaid { get; set; }

        public string PaidAt { get; set; }
        [DefaultValue(false)]
        public bool IsDeliverd { get; set; }
        public string DeliveredAt { get; set; }


    }

}
/*"userInfo":{"id":1,"name":"Morten","email":"mortenolsen4@gmail.com","password":"1234","isAdmin":true},
   "orderItems":[
   {"product":1,"name":"Slim shirt","image":"/images/d1.jpg","price":99,"countInStock":4,"qty":1},
   {"product":3,"name":"Slim shirt","image":"/images/d1.jpg","price":99,"countInStock":4,"qty":1},
   {"product":8,"name":"Big shirt from webapi","image":"/images/d1.jpg","price":300,"countInStock":2,"qty":1},
   {"product":5,"name":"Big shirt from webapi","image":"/images/d1.jpg","price":300,"countInStock":2,"qty":1},
   {"product":4,"name":"Slim shirt from webapi","image":"/images/d1.jpg","price":375,"countInStock":2,"qty":1}
   ]
   ,"shipping":{"adress":"Gautesvei 9","city":"Skien","postalCode":"3731"},
   "itemsPrice":1173,
   "shippingPrice":0,
   "taxPrice":293.25*/
