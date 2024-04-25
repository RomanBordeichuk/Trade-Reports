using main;
using main.Entities;

var builder = WebApplication.CreateBuilder(
    new WebApplicationOptions { WebRootPath = "wwwroot" });
var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

app.Map("/loadCategoriesList", middleware =>
{
    middleware.Run(async context =>
    {
        CategoriesList categoriesList = new();
        await context.Response.WriteAsJsonAsync<List<CategoryJson>>(
            await categoriesList.GetCategoriesListAsync());
    });
});

app.Map("/addProduct", middleware =>
{
    middleware.Run(async context =>
    {
        CategoriesList categoriesList = new();
        await categoriesList.AddProductAsync(
            await context.Request.ReadFromJsonAsync<ProductJson>());

        await context.Response.WriteAsJsonAsync("yeap!");
    });
});

app.Map("/deleteProduct", middleware =>
{
    middleware.Run(async context =>
    {
        CategoriesList categoriesList = new();
        await categoriesList.DeleteProductAsync(
            await context.Request.ReadFromJsonAsync<ProductJson>());

        await context.Response.WriteAsJsonAsync("yeap!");
    });
});

app.Map("/updateProduct", middleware =>
{
    middleware.Run(async context =>
    {
        CategoriesList categoriesList = new();
        await categoriesList.UpdateProductAsync(
            await context.Request.ReadFromJsonAsync<ProductJson>());

        await context.Response.WriteAsJsonAsync("yeap!");
    });
});

app.Map("/updateCategory", middleware =>
{
    middleware.Run(async context =>
    {
        CategoriesList categoriesList = new();
        await categoriesList.UpdateCategoryAsync(
            await context.Request.ReadFromJsonAsync<CategoryJson>());

        await context.Response.WriteAsJsonAsync("yeap!");
    });
});

app.Map("/addCategory", middleware =>
{
    middleware.Run(async context =>
    {
        CategoriesList categoriesList = new();
        CategoryJson categoryJson = await categoriesList.AddCategoryAsync(
            await context.Request.ReadFromJsonAsync<CategoryJson>());

        await context.Response.WriteAsJsonAsync<CategoryJson>(categoryJson);
    });
});

app.Map("/loadOrderInfo", middleware =>
{
    middleware.Run(async context =>
    {
        Order order = new();
        await context.Response.WriteAsJsonAsync<OrderJson>(
            await order.GetNewOrderAsync(
                await context.Request.ReadFromJsonAsync<List<int>>()));
    });
});

app.Map("/saveNewOrder", middleware =>
{
    middleware.Run(async context =>
    {
        Order order = new();
        await order.AddNewOrderAsync(
            await context.Request.ReadFromJsonAsync<OrderJson>());

        await context.Response.WriteAsJsonAsync("yeap!");
    });
});

app.Map("/loadMonthList", middleware =>
{
    middleware.Run(async context =>
    {
        MonthStatsHistoryList monthStatsHistoryList = new();
        await context.Response.WriteAsJsonAsync<List<MonthStatsHistoryJson>>(
            await monthStatsHistoryList.GetMonthStatsHistoryListAsync());
    });
});

app.Map("/loadDaysList", middleware =>
{
    middleware.Run(async context =>
    {
        MonthStatsHistoryList monthStatsHistoryList = new();
        await context.Response.WriteAsJsonAsync<List<DayStatsHistoryJson>>(
            await monthStatsHistoryList.GetDayStatsHistoryJsonListAsync(
                await context.Request.ReadFromJsonAsync<MonthStatsHistoryJson>()));
    });
});

app.Map("/loadDayInfo", middleware =>
{
    middleware.Run(async context =>
    {
        MonthStatsHistoryList monthStatsHistoryList = new();
        await context.Response.WriteAsJsonAsync<DayStatsHistoryJson>(
            await monthStatsHistoryList.GetDayStatsHistoryJsonAsync(
                await context.Request.ReadFromJsonAsync<DayStatsHistoryJson>()));
    });
});

app.Map("/updateOrder", middleware =>
{
    middleware.Run(async context =>
    {
        Order order = new();
        await order.UpdateOrderAsync(
            await context.Request.ReadFromJsonAsync<OrderJson>());

        await context.Response.WriteAsJsonAsync("yeap!");
    });
});

app.Map("/setDollarCourse", middleware =>
{
    middleware.Run(async context =>
    {
        DollarCourseStatic.DollarBuyPrice = await context.Request.ReadFromJsonAsync<double>();

        await context.Response.WriteAsJsonAsync("yeap!");
    });
});

app.Map("/updateDollarCourse", middleware =>
{
    middleware.Run(async context =>
    {
        DayStatsHistory dayStatsHistory = new();

        await dayStatsHistory.UpdateDayStatsHistoryAsync(
            await context.Request.ReadFromJsonAsync<DollarCourseJson>());

        await context.Response.WriteAsJsonAsync("yeap!");
    });
});

app.Run();
