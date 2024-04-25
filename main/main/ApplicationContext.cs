using main.Entities;
using Microsoft.EntityFrameworkCore;

namespace main
{
    public class ApplicationContext : DbContext
    {
        //private string _connectionString =
        //    "Server=DESKTOP-A583LPR\\SQLEXPRESS;Database=TradeReportsDb;" +
        //    "Trusted_Connection=True;TrustServerCertificate=True";

        private string _connectionString =
            "Server=(localDB)\\MSSQLLocalDB;Database=TradeReportsDb;" +
            "Trusted_connection=True;TrustServerCertificate=True";

        public DbSet<Category> Categories { get; set; } = null!;
        public DbSet<Product> Products { get; set; } = null!;
        public DbSet<ManagerPayment> ManagerPayment { get; set; } = null!;
        public DbSet<Order> Orders { get; set; } = null!;
        public DbSet<OrderProduct> OrderProducts { get; set; } = null!;
        public DbSet<MonthStatsHistory> MonthStatsHistories { get; set; } = null!;
        public DbSet<DayStatsHistory> DayStatsHistories { get; set; } = null!;

        public ApplicationContext()
        {
            //Database.EnsureDeleted();
            Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }
    }
}
