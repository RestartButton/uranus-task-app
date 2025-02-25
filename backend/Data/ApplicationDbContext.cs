using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }

    public DbSet<Task> Tasks { get; set; }

    public DbSet<Group> Groups { get; set; }

    public DbSet<GroupUser> GroupUsers { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<GroupUser>()
            .HasKey(ug => new { ug.UserId, ug.GroupId }); // Chave composta

        modelBuilder.Entity<GroupUser>()
            .HasOne(ug => ug.User)
            .WithMany(u => u.GroupUsers)
            .HasForeignKey(ug => ug.UserId);

        modelBuilder.Entity<GroupUser>()
            .HasOne(ug => ug.Group)
            .WithMany(g => g.GroupUsers)
            .HasForeignKey(ug => ug.GroupId);
        
        base.OnModelCreating(modelBuilder);
    }
}

