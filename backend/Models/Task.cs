public class Task
{
    public int Id { get; set; }
    public required int GroupId { get; set; }
    public required string Title { get; set; }
    public required string Description { get; set; }
    public bool isCompleted { get; set; }
}