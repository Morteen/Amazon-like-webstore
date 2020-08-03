namespace WebApi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ReviewClass : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Reviews",
                c => new
                    {
                        _Id = c.Int(nullable: false, identity: true),
                        productId = c.Int(nullable: false),
                        name = c.String(),
                        rating = c.Int(nullable: false),
                        comment = c.String(),
                    })
                .PrimaryKey(t => t._Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Reviews");
        }
    }
}
