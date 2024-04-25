namespace main
{
    public record DollarCourseJson(double dollarBuyPrice, List<int> dollarCourseDate); 

    public static class DollarCourseStatic
    {
        public static double DollarBuyPrice { get; set; } = 38.5;
    }
}
