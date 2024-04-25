namespace main.Entities
{
    public record ProductJson(int id, string name, double buyPrice, double sellPrice, int categoryId);

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public double BuyPrice { get; set; } = 0;
        public double SellPrice { get; set; } = 0;
        public int CategoryId { get; set; }
        public Category Category { get; set; } = null!;

        public Product(string name, double buyPrice, double sellPrice, int categoryId)
        {
            Name = name;
            BuyPrice = buyPrice;
            SellPrice = sellPrice;
            CategoryId = categoryId;
        }

        public ProductJson CovertToJson()
        {
            return new ProductJson(Id, Name, BuyPrice, SellPrice, CategoryId);
        }
    }
}
