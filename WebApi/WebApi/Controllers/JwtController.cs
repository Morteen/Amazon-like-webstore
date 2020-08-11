using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApi.Models;

namespace WebApi.Controllers
{
    public class JwtController : ApiController
    {


        [HttpGet]
        public IHttpActionResult ValidLogin(string username, string password)
        {

            if (username == "admin" && password == "admin")
            {
                return Ok(MyTokenManager.GenerateToken(username));

            }
            else {
                return BadRequest("Noe er galt");
            }
            
        }
        [HttpGet]
       [CustomAuthenticationFilter]
        public HttpResponseMessage GetEmployee()
        {
            return Request.CreateResponse(HttpStatusCode.OK, "Suksess med validering");
        }


    }
}
