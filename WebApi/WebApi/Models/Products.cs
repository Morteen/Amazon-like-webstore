using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;


namespace WebApi.Models
{
    public class Products
    {
        [Key]
        public int productId { get; set; }
        public string name{ get; set; }
        public string image { get; set; }
        public string category { get; set; }
        public double price { get; set; }
        public string brand { get; set; }
        public double rating { get; set; }
        public int numRew { get; set; }
        public int countInStock { get; set; }
        public string description { get; set; }

        // Foreign Keys
       // [ForeignKey("OrderToProduct")]
        public int OrderToProductId { get; set; }
       // public virtual ICollection<OrderToProduct> OrderToProduct { get; set; }
    }

   

}
/**_id: "1",
      name: "Slim shirt",
      category: "shirt",
      image: "/images/d1.jpg",
      price: 60,
      brand: "Nike",
      rating: 4.0,
      numRew: 10,
      countInStock: 0,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry",*/
