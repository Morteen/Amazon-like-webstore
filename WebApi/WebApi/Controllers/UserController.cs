using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApi.Models;

namespace WebApi.Controllers
{
    [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
    public class UserController : ApiController
    {
        private Models.ApplicationDbContext db;

        public UserController()
        {
            db = new ApplicationDbContext();

            var allreadyExist = db.Users.Any(x => x.email == "mortenolsen4@gmail.com");
            if (!allreadyExist)
            {
                db.Users.Add(new Users { UserId = 1, name = "Morten", email = "mortenolsen4@gmail.com", password = "1234", isAdmin = true });
                db.SaveChanges();
            }

            var allreadyExist1 = db.Users.Any(x => x.name == "test");
            if (!allreadyExist1)
            {
                db.Users.Add(new Users { UserId = 3, name = "test", email = "t@t.com", password = "1234" });
                db.SaveChanges();
            }

        }

       

        // GET: api/User
        public IEnumerable<Users> Get()
        {
            return db.Users.ToList();


        }


        public IHttpActionResult GetAllUsers(string email, string password)
        {

            var user = db.Users.SingleOrDefault(x => x.email == email && x.password == password);
            if (user == null)
            {
                return Content(HttpStatusCode.NotFound, "Denne medlemmen finner vi ikke");
            }
            return Ok(user);
        }





        // GET: api/User/5
        public IHttpActionResult Get(int id)
        {
            var user = db.Users.SingleOrDefault(x => x.UserId == id);
            if (user == null)
            {
                return Content(HttpStatusCode.NotFound, "Denne medlemmen finner vi ikke");
            }
            return Ok(user);
        }

        /* "http://localhost:55276/api/Users?name=" +
         name +
         "&email=" +
         email +
         "&password=" +
         password*/
        // POST: api/User
        [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
        public IHttpActionResult Post([FromUri] string name, string email, string password)
        {
            var emailExist = db.Users.Any(x => x.email == email);
            if (emailExist)
            {
                return Content(HttpStatusCode.NotFound, "Denne epost adressen er allerede registrert");
            }
            else
            {

                var newUser = new Users();

                newUser.name = name;
                newUser.email = email;
                newUser.password = password;

                //Sjekker om den nye brukeren ble lagt til


                db.Users.Add(newUser);
                db.SaveChanges();
                var user = db.Users.SingleOrDefault(x => x.email == newUser.email && x.name == newUser.name && x.password == newUser.password);
                if (user == null)
                {
                    return Content(HttpStatusCode.NotFound, "Denne medlemmen blir ikke opprettet");
                }
                return Ok(user);
            }

        }

        // PUT: api/User/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/User/5
        public void Delete(int id)
        {
        }
    }
}
