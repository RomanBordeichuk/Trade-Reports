using main.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace main
{
    public class CategoriesList
    {
        public CategoriesList() { }

        public async Task<List<CategoryJson>> GetCategoriesListAsync()
        {
            List<Category> categoriesList;

            using (ApplicationContext db = new())
            {
                categoriesList = await db.Categories.ToListAsync();
            }

            List<CategoryJson> categoryJsonList = new();

            foreach(Category category in categoriesList)
            {
                await category.GetProductsAsync();
                categoryJsonList.Add(category.ConvertToJson());
            }

            return categoryJsonList;
        }
        public async Task AddProductAsync(ProductJson? productJson)
        {
            Product product = new(productJson!.name, productJson.buyPrice, 
                productJson.sellPrice, productJson.categoryId);

            using(ApplicationContext db = new())
            {
                await db.Products.AddAsync(product);
                await db.SaveChangesAsync();
            }
        }

        public async Task DeleteProductAsync(ProductJson? productJson)
        {
            using (ApplicationContext db = new())
            {
                Product product = await db.Products.FirstAsync(p => p.Id == productJson!.id);

                db.Products.Remove(product);
                await db.SaveChangesAsync();

                if(await db.Products.FirstOrDefaultAsync(p => p.CategoryId == product.CategoryId) == null)
                {
                    Category category = await db.Categories.FirstAsync(c => c.Id == product.CategoryId);
                
                    db.Categories.Remove(category);
                    await db.SaveChangesAsync();
                }
            }
        }

        public async Task UpdateProductAsync(ProductJson? productJson)
        {
            using (ApplicationContext db = new())
            {
                Product? oldProduct = await db.Products.FirstOrDefaultAsync(p => p.Id == productJson!.id);
                
                if (
                    oldProduct!.Name == productJson!.name &&
                    oldProduct.BuyPrice == productJson.buyPrice &&
                    oldProduct.SellPrice == productJson.sellPrice) return;
                
                oldProduct!.Name = productJson!.name;
                oldProduct.BuyPrice = productJson.buyPrice;
                oldProduct.SellPrice = productJson.sellPrice;

                await db.SaveChangesAsync();
            }
        }

        public async Task UpdateCategoryAsync(CategoryJson? categoryJson)
        {
            using (ApplicationContext db = new())
            {
                Category category = await db.Categories.FirstAsync(c => c.Id == categoryJson!.id);
                
                if (category.Name == categoryJson!.name) return;
                
                category.Name = categoryJson.name;

                await db.SaveChangesAsync();
            }
        }
        
        public async Task<CategoryJson> AddCategoryAsync(CategoryJson? categoryJson)
        {
            Category category = new(categoryJson!.name);

            using (ApplicationContext db = new())
            {
                await db.Categories.AddAsync(category);
                await db.SaveChangesAsync();
            }

            CategoryJson finalCategoryJson = new(category.Id, category.Name, []);

            return finalCategoryJson;
        }
    }
}
