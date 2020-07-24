using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApi.Models;
using System.Web.Http.Cors;

using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using WebApi.Models.DTOModels;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Controllers
{
    [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
    public class ProductsController : ApiController
    {

        private Models.ApplicationDbContext db;

        public ProductsController()
        {
            db = new ApplicationDbContext();
            var allreadyExist = db.Products.Any(x => x.productId == 1);
            if (!allreadyExist)
            {

                db.Products.Add(new Products { productId = 1, name = "Slim shirt", image = "/images/d1.jpg", category = "shirt", price = 99, brand = "Nike", countInStock = 4, description = "Lorem Ipsum is simply dummy" });
                db.SaveChanges();
            }
           var allreadyExist1 = db.Products.Any(x => x.productId == 2);
           if (!allreadyExist1)
           {

                db.Products.Add(new Products { productId = 2, name = "Slim shirt from webapi", image = "/images/d1.jpg", category = "shirt", price = 375, brand = "Nike", countInStock = 2, description = "Lorem Ipsum er fra Webapi" });
                db.SaveChanges();
           }
           var allreadyExist2 = db.Products.Any(x => x.productId == 3);
           if (!allreadyExist2)
           {
                db.Products.Add(new Products { productId = 3, name = "Big shirt from webapi", image = "/images/d1.jpg", category = "shirt", price = 300, brand = "Nike", countInStock = 2, description = "Lorem Ipsum er fra Webapi" });
                db.SaveChanges();
           }

          



        }








        // GET: api/Products
        public IEnumerable<DtoProducts> Get()
        {
            
           return DtoHelper.ProductList_To_DtoList(db.Products.ToList()) ;
            
        }
        

        // GET: api/Products/5
        public IHttpActionResult Get(int id)
        {
            var product = db.Products.FirstOrDefault((p) => p.productId== id);
            if (product == null)
            {
                return NotFound();
            }
           var DtoProd= DtoHelper.Product_To_DtoProd(product);
            return Ok(DtoProd);
        }



        // POST: api/Products
        [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
        
        public IHttpActionResult Post([FromBody]DtoProducts DtoProduct)
        {
            var product = DtoHelper.FromDtoProduct_To_Product(DtoProduct);
            var productExist = db.Products.Any(x => x.name == product.name && x.category == product.category && x.price == product.price && x.brand == product.brand);
            if (productExist)
            {
                return Content(HttpStatusCode.NotFound, "Dette produktet er allerede registrert i databasen");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            db.Products.Add(product);
            db.SaveChanges();
            return Ok(product);
        }

        // PUT: api/Products/5
        public IHttpActionResult Put( int id,[FromBody] DtoProducts product)
        {
            var updatetProduct = DtoHelper.FromDtoProduct_To_Product(product);
            if (!ModelState.IsValid)
            {
                return BadRequest("det er her det feiler: "+ModelState);
            }

            if (id != product._id)
            {
                return BadRequest("Sorry, seems something wrong. Couldn't deter mine record to update.");
            }

            db.Entry(updatetProduct).State = EntityState.Modified;
            db.SaveChanges();
            product.product = product._id;
          

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
               
                  throw;
                
            }

            return Ok(product);
        }








        // DELETE: api/Products/5
        public IHttpActionResult Delete(int id)
        {
            var product = db.Products.Find(id);
            if (product == null)
                return BadRequest();
           db.Products.Remove(product);
            db.SaveChanges();

            return Ok("Produktet er slettet");
        }
    }
}
