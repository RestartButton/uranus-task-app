using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class GroupsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public GroupsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetGroups()
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
        var groupList = await _context.GroupUsers
            .Where(gu => gu.UserId == userId && gu.Status)
            .Select(gu => new
            {
                gu.Group.Id,
                gu.Group.Name
            })
            .ToListAsync();
        
        if (groupList == null || groupList.Count == 0)
            return NotFound(new { message = "Usuário não está associado a nenhum grupo." });

        return Ok(groupList);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetGroup(int id)
    {
        var group = await _context.Groups.FindAsync(id);
        var taskList = _context.Tasks.Where(t => t.GroupId == id).ToList();
        if (group == null) return BadRequest();
        var groupDto = new GroupDto 
        {
            Id = group.Id,
            Name = group.Name,
            CreatedBy = group.CreatedBy,
            CreatedOn = group.CreatedOn,
        };
        return Ok( new {
            groupDto,
            taskList
        });
    }

    [HttpPost]
    public async Task<ActionResult<Group>> PostGroup(GroupDto newGroup)
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
        var user = await _context.Users.FindAsync(userId);
        var group = new Group
        {
            Name = newGroup.Name,
            CreatedBy = userId,
            CreatedOn = DateTime.Now
        };

        _context.Groups.Add(group);
        await _context.SaveChangesAsync();

        group.GroupUsers.Add(new GroupUser 
        {
            UserId = userId,
            GroupId = group.Id,
            Status = true,
            AssociationDate = DateTime.Now
        });
        await _context.SaveChangesAsync();

        var groupDto = new GroupDto 
        {
            Id = group.Id,
            Name = group.Name,
            CreatedBy = group.CreatedBy,
            CreatedOn = group.CreatedOn,
        };
        
        return CreatedAtAction(nameof(PostGroup), new { id = group.Id }, new { message = "Grupo criado com sucesso!", groupDto});
    }

    [HttpPost("{groupId}/user/{userId}")]
    public async Task<IActionResult> AddUserGroup(int groupId, int userId)
    {
        _context.GroupUsers.Add(new GroupUser
        {
            UserId = userId,
            GroupId = groupId,
            Status = true
        });
        await _context.SaveChangesAsync();

        return Ok(new { message = "Usuário adicionado ao grupo com sucesso!"});
    }

    [HttpDelete("{groupId}/user/{userId}")]
    public async Task<IActionResult> RemoveUserGroup(int groupId, int userId)
    {
        var groupUser = await _context.GroupUsers
            .FirstOrDefaultAsync(gu => gu.UserId == userId && gu.GroupId == groupId);

        if(groupUser == null)
            return NotFound();
        if(groupUser.Group.CreatedBy == userId)
            return BadRequest();

        groupUser.Status = false;
        groupUser.DeassociationDate = DateTime.Now;

        _context.GroupUsers.Update(groupUser);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Usuário removido do grupo com sucesso!" });
    }
}