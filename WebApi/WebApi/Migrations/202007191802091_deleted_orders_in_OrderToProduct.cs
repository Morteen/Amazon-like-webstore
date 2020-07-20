namespace WebApi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class deleted_orders_in_OrderToProduct : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.OrderToProducts", "productId", "dbo.Products");
            DropIndex("dbo.OrderToProducts", new[] { "productId" });
        }
        
        public override void Down()
        {
            CreateIndex("dbo.OrderToProducts", "productId");
            AddForeignKey("dbo.OrderToProducts", "productId", "dbo.Products", "productId", cascadeDelete: true);
        }
    }
}
