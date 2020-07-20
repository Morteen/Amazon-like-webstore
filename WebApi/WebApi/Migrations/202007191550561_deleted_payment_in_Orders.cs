namespace WebApi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class deleted_payment_in_Orders : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Orders", "PaymentId", "dbo.Payments");
            DropIndex("dbo.Orders", new[] { "PaymentId" });
        }
        
        public override void Down()
        {
            CreateIndex("dbo.Orders", "PaymentId");
            AddForeignKey("dbo.Orders", "PaymentId", "dbo.Payments", "PaymentId", cascadeDelete: true);
        }
    }
}
