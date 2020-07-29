SELECT * FROM Orders
SELECT * FROM Shippings WHERE ShippingId=1
SELECT * FROM OrderToProducts
SELECT * FROM  Users
SELECT * FROM dbo.Payments
SELECT * FROM Products
SELECT COUNT(*) FROM orders WHERE userid=2

UPDATE Orders
SET CreatedAt =GETDATE()

WHERE OrderId IN(3,5,8)