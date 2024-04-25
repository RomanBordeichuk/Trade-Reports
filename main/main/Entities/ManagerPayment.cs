using Microsoft.EntityFrameworkCore;

namespace main.Entities
{
    public class ManagerPayment
    {
        public int Id { get; set; }

        public double Value { get; set; }

        public ManagerPayment() { }
        public ManagerPayment(int value)
        {
            Value = value;
        }

        public async Task<double> GetValueAsync()
        {
            using (ApplicationContext db = new())
            {
                if(await db.ManagerPayment.FirstOrDefaultAsync(m => m.Id == 1) == null)
                {
                    await db.ManagerPayment.AddAsync(new ManagerPayment(0));
                    await db.SaveChangesAsync();

                    return 0;
                }
                else
                {
                    ManagerPayment managerPayment = 
                        await db.ManagerPayment.FirstAsync(m => m.Id == 1);

                    return managerPayment.Value;
                }
            }
        }

        public async Task SetValueAsync(double value)
        {
            using(ApplicationContext db = new())
            {
                ManagerPayment managerPayment =
                    await db.ManagerPayment.FirstAsync(m => m.Id == 1);

                managerPayment.Value = value;

                await db.SaveChangesAsync();
            }
        }
    }
}
