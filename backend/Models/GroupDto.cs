public class GroupDto 
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public int? CreatedBy { get; set; }
    public DateTime? CreatedOn { get; set; }
}