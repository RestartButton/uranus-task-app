public class Group
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required int CreatedBy { get; set; }
    public required DateTime CreatedOn { get; set; }

    public List<GroupUser> GroupUsers { get; set; } = new();
}