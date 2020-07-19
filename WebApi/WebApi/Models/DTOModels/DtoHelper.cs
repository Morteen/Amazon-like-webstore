using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApi.Models.DTOModels
{
    public class DtoHelper
    {

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

    }
}