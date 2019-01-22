### Use of entity framework in visual studio

We used database first because we already had a database running on azure

1. Get connection string of the database
2. Make sure you use ASP.NET Core 2.1 since you don't need to install extra packages
3. Open your package manager Console
4. Run this command to scaffold the database: Scaffold-DbContext "Server=riskantwerprestdbserver.database.windows.net,1433;Initial Catalog=RiskAntwerpRest_db;Persist Security Info=False;UserID=Your_Username; Password=Your_password; MultipleActiveResultSets=False; Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models
5. The entity framework is now ready to be used
