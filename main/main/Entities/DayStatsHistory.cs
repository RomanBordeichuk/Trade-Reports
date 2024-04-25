using Microsoft.EntityFrameworkCore;

namespace main.Entities
{
    public record DayStatsHistoryJson(int id, int monthId, List<int> date, 
        double dollarCourse, List<OrderJson> orderList);
    public class DayStatsHistory
    {
        public int Id { get; set; }
        public int MonthStatsHistoryId { get; set; }
        public DateOnly Date { get; set; }
        public double DollarCourse { get; set; }
        public List<Order> OrdersList { get; set; } = new();

        public DayStatsHistory() { }
        
        public DayStatsHistory(int monthStatsHistoryId, DateOnly date)
        {
            MonthStatsHistoryId = monthStatsHistoryId;
            Date = date;
            DollarCourse = DollarCourseStatic.DollarBuyPrice;
        }

        public async Task AddNewDayStatsHistoryAsync()
        {
            using (ApplicationContext db = new())
            {
                await db.DayStatsHistories.AddAsync(this);
                await db.SaveChangesAsync();
            }
        }

        public async Task UpdateDayStatsHistoryAsync(DollarCourseJson? dollarCourseJson)
        {
            DateOnly date = new(dollarCourseJson!.dollarCourseDate[0], 
                dollarCourseJson.dollarCourseDate[1], dollarCourseJson.dollarCourseDate[2]);

            using (ApplicationContext db = new())
            {
                DayStatsHistory dayStatsHistory =
                    await db.DayStatsHistories.FirstAsync(
                        d => d.Date == date);

                dayStatsHistory.DollarCourse = dollarCourseJson!.dollarBuyPrice;

                await db.SaveChangesAsync();
            }
        }

        public DayStatsHistoryJson ConvertToJson()
        {
            List<int> date = [Date.Year, Date.Month, Date.Day];
            List<OrderJson> orderJsonList = new();

            return new(Id, MonthStatsHistoryId, date, DollarCourse, orderJsonList);
        }

        public async Task<DayStatsHistoryJson> ConvertToJsonCompletelyAsync()
        {
            List<int> date = [Date.Year, Date.Month, Date.Day];
            List<Order> orderList;

            using (ApplicationContext db = new())
            {
                orderList = await db.Orders.Where(
                    o => o.DayStatsHistoryId == Id).ToListAsync();
            }

            List<OrderJson> orderJsonList = new();

            foreach (Order order in orderList)
            {
                orderJsonList.Add(await order.ConvertToJsonCompletelyAsync());
            }

            return new(Id, MonthStatsHistoryId, date, DollarCourse, orderJsonList);
        }
    }
}
