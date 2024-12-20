using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    // Adicione aqui os DbSets para suas entidades
    public DbSet<Task> Tasks { get; set; }
}