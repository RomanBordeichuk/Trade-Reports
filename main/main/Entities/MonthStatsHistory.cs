using Microsoft.EntityFrameworkCore.Metadata.Conventions;

namespace main.Entities
{
    public record MonthStatsHistoryJson(int id, List<int> month, List<DayStatsHistoryJson> daysList);
    public class MonthStatsHistory
    {
        public int Id { get; set; }
        public DateOnly Month { get; set; }
        public List<DayStatsHistory> DayStatsHistoryList { get; set; } = new();

        public MonthStatsHistory() { }

        public MonthStatsHistory(DateOnly month)
        {
            Month = month;
        }

        public async Task AddNewMonthStatsHistoryAsync()
        {
            using (ApplicationContext db = new())
            {
                await db.MonthStatsHistories.AddAsync(this);
                await db.SaveChangesAsync();
            }
        }

        public MonthStatsHistoryJson ConvertToJson()
        {
            List<int> month = [Month.Month, Month.Year];
            List<DayStatsHistoryJson> dayStatsHistoryJsonList = new();

            return new(Id, month, new());
        }
    }
}
