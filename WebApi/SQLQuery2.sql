SELECT * FROM Orders
SELECT * FROM Shippings WHERE ShippingId=1
SELECT * FROM OrderToProducts
SELECT * FROM  Users
SELECT * FROM dbo.Payments
SELECT * FROM Products
SELECT COUNT(*) FROM orders WHERE userid=2

UPDATE Users
SET email = 'morten@webshop.no'

WHERE UserId=2