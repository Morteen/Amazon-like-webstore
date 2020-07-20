namespace WebApi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class deleted_OrderId_in_payment : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.Payments", "OrderId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Payments", "OrderId", c => c.Int(nullable: false));
        }
    }
}
