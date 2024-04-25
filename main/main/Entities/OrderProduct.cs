namespace main.Entities
{
    public record OrderProductJson(int id, string name, double sellPrice, 
        double buyPrice, int num, int orderId);

    public class OrderProduct
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public string Name { get; set; } = null!;
        public double SellPrice { get; set; }
        public double BuyPrice { get; set; }
        public int Num { get; set; }

        public OrderProduct() { }
        public OrderProduct(string name, double sellPrice, double buyPrice, int num, int orderId)
        {
            Name = name;
            SellPrice = sellPrice;
            BuyPrice = buyPrice;
            Num = num;
            OrderId = orderId;
        }

        public OrderProductJson ConvertToJson()
        {
            return new(Id, Name, SellPrice, BuyPrice, Num, OrderId);
        }
        public OrderProduct ConvertFromJson(OrderProductJson orderProductJson)
        {
            OrderProduct orderProduct = new();

            orderProduct.Id = orderProductJson.id;
            orderProduct.Name = orderProductJson.name;
            orderProduct.SellPrice = orderProductJson.sellPrice;
            orderProduct.BuyPrice = orderProductJson.buyPrice;
            orderProduct.Num = orderProductJson.num;
            orderProduct.OrderId = orderProductJson.orderId;

            return orderProduct;
        }
    }
}
