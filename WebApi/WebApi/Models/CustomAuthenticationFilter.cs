using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Filters;
using System.Web.Http.Results;

namespace WebApi.Models
{
    public class CustomAuthenticationFilter : AuthorizeAttribute, IAuthenticationFilter
    {
        public bool AllowMultiple { get { return false; } }

        public async Task AuthenticateAsync(HttpAuthenticationContext context, CancellationToken cancellationToken)
        {
            string authParameter = string.Empty;
            HttpRequestMessage request = context.Request;
            AuthenticationHeaderValue authorization = request.Headers.Authorization;

            if (authorization == null)
            {
                context.ErrorResult = new AuthenticationFailureResult("Vi kommer hit ,men ikke lengere Mangler Auth Header",request);
                return;
            }
            if (authorization.Scheme!="Bearer")
            {
                context.ErrorResult = new AuthenticationFailureResult("Mangler/feil med med Schema dsv Bearer delen ", request);
                return;
            }
            if (string.IsNullOrEmpty(authorization.Parameter)) {
                context.ErrorResult = new AuthenticationFailureResult("Mangler token", request);
                return;
            }

            context.Principal = MyTokenManager.GetPrincipal(authorization.Parameter);
        }

        public async Task ChallengeAsync(HttpAuthenticationChallengeContext context, CancellationToken cancellationToken)
        {
            var test1 = context;
            var result = await context.Result.ExecuteAsync(cancellationToken);
            var test = result.StatusCode;
            if (result.StatusCode==HttpStatusCode.Unauthorized) {
              
                result.Headers.WwwAuthenticate.Add(new AuthenticationHeaderValue("Basic","realm=localhost"));
            }
            context.Result = new ResponseMessageResult(result);
           // context.Result ="Success yesss"
        }
    }





    public class AuthenticationFailureResult : IHttpActionResult
    {
        public string reasonPhrase;

        public AuthenticationFailureResult(string reasonPhrase, HttpRequestMessage request)
        {
            this.reasonPhrase = reasonPhrase+"Det feiler her!";
            this.request = request;
        }

        public HttpRequestMessage request { get; set; }
        public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
        {
            return Task.FromResult(Execute());
        }

        public HttpResponseMessage Execute()
        {
            HttpResponseMessage responseMessage = new HttpResponseMessage(HttpStatusCode.Unauthorized);
            responseMessage.RequestMessage = request;
            responseMessage.ReasonPhrase = reasonPhrase;
            return responseMessage;
        }
    }
}