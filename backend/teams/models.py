from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Team(models.Model):
    name = models.CharField(max_length=100)
    # TODO: make this so another user becomes the leader 
    leader = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return f"{self.name} - {self.leader.username if self.leader else 'No Leader'}"

class TeamMembers(models.Model):
    team_Id = models.ForeignKey(Team, on_delete=models.CASCADE)
    member_id = models.ForeignKey(User, on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.team_Id.name} - {self.member_id.username}"

class Module(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class TeamMemberModules(models.Model):
    team_Id = models.ForeignKey(Team, on_delete=models.CASCADE)
    member_id = models.ForeignKey(User, on_delete=models.CASCADE)
    module_id = models.ForeignKey(Module, on_delete=models.CASCADE)

    def __str__(self):
         return f"{self.team_Id.name}: {self.member_id.username} > {self.module_id.name}"

