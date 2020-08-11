using Microsoft.IdentityModel.Tokens;
using System;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;



namespace WebApi.Models
{
    public class MyTokenManager
    {
       private static string Secret = "testtesttesttesttesttesttesttesttesttest";
        public static string GenerateToken(string userName)
        {
            byte[]key = Convert.FromBase64String(Secret);

            SymmetricSecurityKey securityKey = new SymmetricSecurityKey(key);
            Console.Write("test av SymmetricSecurityKey ", securityKey);

            SecurityTokenDescriptor descriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Name, userName) }),
                Expires = DateTime.UtcNow.AddMinutes(30),
                SigningCredentials = new SigningCredentials(securityKey,SecurityAlgorithms.HmacSha256Signature)

            };
            JwtSecurityTokenHandler handler = new JwtSecurityTokenHandler();
            JwtSecurityToken token = handler.CreateJwtSecurityToken(descriptor);

            return handler.WriteToken(token);
        }
        public static ClaimsPrincipal GetPrincipal(string token)
        {
            try {
                JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
                JwtSecurityToken jwtToken = (JwtSecurityToken)tokenHandler.ReadToken(token);
                if (jwtToken==null) { return null; }
                byte[] key = Convert.FromBase64String(Secret);
                TokenValidationParameters parameters = new TokenValidationParameters()
                {
                    RequireExpirationTime = true,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    IssuerSigningKey = new SymmetricSecurityKey(key)
                };
                SecurityToken securityToken;
                ClaimsPrincipal principal = tokenHandler.ValidateToken(token, parameters, out securityToken);
                return principal;
            } catch {
                return null;
            }
           
        }
    }
}