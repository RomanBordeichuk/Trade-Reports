using main.Entities;
using Microsoft.EntityFrameworkCore;

namespace main
{
    public class MonthStatsHistoryList
    {
        public MonthStatsHistoryList() { }

        public async Task<List<MonthStatsHistoryJson>> GetMonthStatsHistoryListAsync()
        {
            List<MonthStatsHistory> monthStatsHistoryList;

            using (ApplicationContext db = new())
            {
                monthStatsHistoryList = await db.MonthStatsHistories.ToListAsync();
            }

            List<MonthStatsHistoryJson> monthStatsHistoryJsonList = new();

            foreach (MonthStatsHistory monthStatsHistory in monthStatsHistoryList)
            {
                monthStatsHistoryJsonList.Add(monthStatsHistory.ConvertToJson());
            }

            return monthStatsHistoryJsonList;
        }

        public async Task<List<DayStatsHistoryJson>> GetDayStatsHistoryJsonListAsync(
            MonthStatsHistoryJson? monthStatsHistoryJson)
        {
            List<DayStatsHistory> dayStatsHistoryList;

            using (ApplicationContext db = new())
            {
                dayStatsHistoryList = await db.DayStatsHistories.Where(
                    d => d.MonthStatsHistoryId == monthStatsHistoryJson!.id).ToListAsync();
            }

            List<DayStatsHistoryJson> dayStatsHistoryJsonList = new();

            foreach (DayStatsHistory dayStatsHistory in dayStatsHistoryList)
            {
                dayStatsHistoryJsonList.Add(dayStatsHistory.ConvertToJson());
            }

            return dayStatsHistoryJsonList;
        }

        public async Task<DayStatsHistoryJson> GetDayStatsHistoryJsonAsync(
            DayStatsHistoryJson? dayStatsHistoryJson)
        {
            DayStatsHistory dayStatsHistory;

            using (ApplicationContext db = new())
            {
                dayStatsHistory = await db.DayStatsHistories.FirstAsync(
                    d => d.Id == dayStatsHistoryJson!.id);
            }

            return await dayStatsHistory.ConvertToJsonCompletelyAsync();
        }
    }
}
