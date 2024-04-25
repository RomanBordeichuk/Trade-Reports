using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace main.Entities
{
    public record OrderJson(int id, int dayId, int clientNum, List<int> date,
        double managerPayValue, List<OrderProductJson> productsList, double 
        totalSellPrice, double totalBuyPrice, double totalIncome);
    public class Order
    {
        public int Id { get; set; }
        public int DayStatsHistoryId { get; set; }
        public int ClientNum { get; set; }
        public DateOnly Date { get; set; }
        public double ManagerPayValue { get; set; }
        public double TotalSellPrice { get; set; }
        public double TotalBuyPrice { get; set; }
        public double TotalIncome { get; set; }
        public List<OrderProduct> ProductsList { get; set; } = null!;

        public Order() { }
        public Order(int dayStatsHistoryId, int clientNum, DateOnly date, double managerPayValue,
            double totalSellPrice, double totalBuyPrice,
            double totalIncome)
        {
            DayStatsHistoryId = dayStatsHistoryId;
            ClientNum = clientNum;
            Date = date;
            ManagerPayValue = managerPayValue;
            TotalSellPrice = totalSellPrice;
            TotalBuyPrice = totalBuyPrice;
            TotalIncome = totalIncome;
        }

        public async Task<OrderJson> GetNewOrderAsync(List<int>? dateList)
        {
            DateOnly date = new DateOnly(dateList![2], dateList![1], dateList![0]);

            DayStatsHistory? dayStatsHistory;

            using (ApplicationContext db = new())
            {
                dayStatsHistory =
                    await db.DayStatsHistories.FirstOrDefaultAsync(d => d.Date == date);
            }

            ManagerPayment managerPayment = new();
            Order order = new();

            using (ApplicationContext db = new())
            {
                if (dayStatsHistory != null)
                {
                    List<Order> orderList = await db.Orders.Where(
                        o => o.DayStatsHistoryId == dayStatsHistory.Id).ToListAsync();

                    int clientNum = orderList[orderList.Count - 1].ClientNum + 1;

                    OrderJson orderJson = new(1, 1, clientNum, new(),
                        await managerPayment.GetValueAsync(), new(), 0, 0, 0);

                    return orderJson;
                }
                else
                {
                    OrderJson orderJson = new(1, 1, 1, new(),
                        await managerPayment.GetValueAsync(), new(), 0, 0, 0);

                    return orderJson;
                }
            }
        }
        public async Task AddNewOrderAsync(OrderJson? orderJson)
        {
            ManagerPayment managerPayment = new();
            await managerPayment.SetValueAsync(orderJson!.managerPayValue);

            DateOnly date = new DateOnly(+orderJson!.date[0], +orderJson.date[1], +orderJson.date[2]);
            DateOnly month = new DateOnly(+orderJson!.date[0], +orderJson.date[1], 1);

            DayStatsHistory? dayStatsHistory;

            using (ApplicationContext db = new())
            {
                dayStatsHistory = await db.DayStatsHistories.FirstOrDefaultAsync(
                    d => d.Date == date);

                if(dayStatsHistory == null)
                {
                    MonthStatsHistory? monthStatsHistory = 
                        await db.MonthStatsHistories.FirstOrDefaultAsync(
                            m => m.Month == month);

                    if(monthStatsHistory == null)
                    {
                        monthStatsHistory = new(month);
                        await monthStatsHistory.AddNewMonthStatsHistoryAsync();
                    }

                    dayStatsHistory = new(monthStatsHistory.Id, date);
                    await dayStatsHistory.AddNewDayStatsHistoryAsync();
                }
            }

            Order order = new(dayStatsHistory.Id, orderJson!.clientNum, date, orderJson.managerPayValue,
                orderJson.totalSellPrice, orderJson.totalBuyPrice, orderJson.totalIncome);

            using (ApplicationContext db = new())
            {
                await db.Orders.AddAsync(order);
                await db.SaveChangesAsync();

                foreach (OrderProductJson orderProductJson in orderJson!.productsList)
                {
                    OrderProduct orderProduct = new(orderProductJson.name, orderProductJson.sellPrice,
                        orderProductJson.buyPrice, orderProductJson.num, order.Id);

                    await db.OrderProducts.AddAsync(orderProduct);
                    await db.SaveChangesAsync();
                }
            }
        }

        public async Task UpdateOrderAsync(OrderJson? orderJson)
        {
            Order order;

            using (ApplicationContext db = new())
            {
                order = await db.Orders.FirstAsync(o => o.Id == orderJson!.id);

                if (orderJson!.productsList.Count != 0)
                {
                    order.ManagerPayValue = orderJson.managerPayValue;
                    order.TotalSellPrice = orderJson.totalSellPrice;
                    order.TotalBuyPrice = orderJson.totalBuyPrice;
                    order.TotalIncome = orderJson.totalIncome;

                    int orderId = orderJson.id;

                    List<OrderProduct> dbOrderProducts = await db.OrderProducts.Where(
                        o => o.OrderId == orderId).ToListAsync();
                    List<OrderProductJson> jsonOrderProducts = orderJson.productsList;

                    List<bool> dbOrderProductUsedList = new();

                    for (int i = 0; i < dbOrderProducts.Count; i++) dbOrderProductUsedList.Add(false);

                    for (int i = 0; i < jsonOrderProducts.Count; i++)
                    {
                        bool jsonOrderProductDetected = false;

                        for (int j = 0; j < dbOrderProducts.Count; j++) {
                            if (jsonOrderProducts[i].id == dbOrderProducts[j].Id)
                            {
                                OrderProduct orderProduct = await db.OrderProducts.FirstAsync(
                                    o => o.Id == dbOrderProducts[j].Id);

                                orderProduct.Name = jsonOrderProducts[i].name;
                                orderProduct.SellPrice = jsonOrderProducts[i].sellPrice;
                                orderProduct.BuyPrice = jsonOrderProducts[i].buyPrice;
                                orderProduct.Num = jsonOrderProducts[i].num;

                                jsonOrderProductDetected = true;
                                dbOrderProductUsedList[j] = true;
                                break;
                            }
                        }

                        if (!jsonOrderProductDetected)
                        {
                            OrderProduct orderProduct = new(jsonOrderProducts[i].name,
                                jsonOrderProducts[i].sellPrice, jsonOrderProducts[i].buyPrice,
                                jsonOrderProducts[i].num, jsonOrderProducts[i].orderId);

                            await db.OrderProducts.AddAsync(orderProduct);
                        }
                    }

                    for (int i = 0; i < dbOrderProducts.Count; i++)
                    {
                        if (!dbOrderProductUsedList[i])
                        {
                            db.OrderProducts.Remove(dbOrderProducts[i]);
                        }
                    }
                }
                else
                {
                    db.Orders.Remove(order);

                    int dayId = order.DayStatsHistoryId;

                    List<Order> orders = await db.Orders.Where(
                        o => o.DayStatsHistoryId == dayId).ToListAsync();

                    if(orders.Count <= 1)
                    {
                        DayStatsHistory dayStatsHistory = await db.DayStatsHistories.FirstAsync(
                            d => d.Id == dayId);

                        db.DayStatsHistories.Remove(dayStatsHistory);

                        int monthId = dayStatsHistory.MonthStatsHistoryId;

                        List<DayStatsHistory> dayStatsHistoryList =
                            await db.DayStatsHistories.Where(
                                d => d.MonthStatsHistoryId == monthId).ToListAsync();

                        if(dayStatsHistoryList.Count <= 1)
                        {
                            MonthStatsHistory monthStatsHistory =
                                await db.MonthStatsHistories.FirstAsync(
                                    m => m.Id == monthId);

                            db.MonthStatsHistories.Remove(monthStatsHistory);
                        }
                    }
                }

                await db.SaveChangesAsync();
            }
        }

        public OrderJson ConvertToJson()
        {
            List<int> date = [Date.Year, Date.Month, Date.Day];
            List<OrderProductJson> orderProductsList = new();

            return new(Id, DayStatsHistoryId, ClientNum, date, ManagerPayValue, 
                orderProductsList, TotalSellPrice, TotalBuyPrice, TotalIncome);
        }

        public async Task<OrderJson> ConvertToJsonCompletelyAsync()
        {
            List<int> date = [Date.Year, Date.Month, Date.Day];
            List<OrderProduct> orderProductsList;

            using(ApplicationContext db = new())
            {
                orderProductsList = await db.OrderProducts.Where(
                    o => o.OrderId == Id).ToListAsync();
            }

            List<OrderProductJson> orderProductJsonList = new();

            foreach (OrderProduct orderProduct in orderProductsList)
            {
                orderProductJsonList.Add(orderProduct.ConvertToJson());
            }

            return new(Id, DayStatsHistoryId, ClientNum, date, ManagerPayValue,
                orderProductJsonList, TotalSellPrice, TotalBuyPrice, TotalIncome);
        }
    }
}
