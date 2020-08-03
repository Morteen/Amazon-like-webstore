using System;
using System.Collections.Generic;
using System.Data.Entity;
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
    public class ReviewController : ApiController
    {


        private Models.ApplicationDbContext db;

        public ReviewController()
        {
            db = new ApplicationDbContext();



        }



        // GET: api/Review
        public IEnumerable<Reviews> Get()
        {
            return db.Reviews.ToList();
        }

        // GET: api/Review/5
        public IHttpActionResult Get(int id)
        {
            var reviwesOnProduct = db.Reviews.Where(r => r.productId == id);
            return Ok(reviwesOnProduct); 
        }

        // POST: api/Review
        public IHttpActionResult Post([FromBody]Reviews review)
        {
            var newReview = new Reviews { productId = review.productId, name = review.name, rating = review.rating, comment = review.comment };
            var updateToNewRatingOnProduct = db.Products.Find(review.productId);
            updateToNewRatingOnProduct.rating = updateToNewRatingOnProduct.rating + review.rating;
            updateToNewRatingOnProduct.numRew = updateToNewRatingOnProduct.numRew + 1;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            db.Reviews.Add(newReview);
            db.Entry(updateToNewRatingOnProduct).State = EntityState.Modified;
            db.SaveChanges();
            return Ok(review);
        }

        // PUT: api/Review/5
        public void Put(int id, [FromBody]string value)
        {
           
        }

        // DELETE: api/Review/5
        public void Delete(int id)
        {
        }
    }
}
