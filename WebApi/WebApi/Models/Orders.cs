using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using WebApi.Models;

namespace WebApi.Models
{
    public class Orders
    {[Key]
        public int OrderId { get; set; }
        public List<int> ItemIds { get; set; }
        public double ItemsPrice { get; set; }
        public double  Taxprice { get; set; }
        public double ShippingPrice { get; set; }
        public double TotalPrice { get; set; }
        [DefaultValue(false)]
        public bool IsPaid{ get; set; }

        public string PaidAt { get; set; }
        [DefaultValue(false)]
        public bool IsDeliverd { get; set; }
        public string DeliveredAt { get; set; }

        // Foreign Keys
        [ForeignKey("OrderToProduct")]
        public int OrderToProductId { get; set; }
        [ForeignKey("Shipping")]
        public int ShippingId { get; set; }
        [ForeignKey("Payment")]
        public int PaymentId { get; set; }
        [ForeignKey("Users")]
        public int UserId { get; set; }
        public virtual ICollection<OrderToProduct> OrderToProduct { get; set; }
        public virtual Shipping Shipping { get; set; }
        public virtual Payment Payment { get; set; }
        public virtual Users Users { get; set; }





    }
}