using Microsoft.EntityFrameworkCore;

namespace main.Entities
{
    public record CategoryJson(int id, string name, List<ProductJson> products);

    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public List<Product> Products { get; set; } = new();

        public Category(string name)
        {
            Name = name;
        }

        public async Task GetProductsAsync()
        {
            using (ApplicationContext db = new())
            {
                Products = await db.Products.Where(p => p.CategoryId == Id).ToListAsync();
            }
        }

        public CategoryJson ConvertToJson()
        {
            List<ProductJson> productJsonList = new();

            foreach (Product product in Products)
            {
                productJsonList.Add(product.CovertToJson());
            }

            return new(Id, Name, productJsonList);
        }
    }
}
