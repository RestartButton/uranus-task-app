public class GroupUser
{
    public int UserId { get; set; }
    public User User { get; set; }

    public int GroupId { get; set; }
    public Group Group { get; set; }

    public DateTime AssociationDate { get; set; }
    public bool Status { get; set; }
    public DateTime DeassociationDate { get; set; }
}