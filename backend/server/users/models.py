from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    REQUIRED_FIELDS = ["email", "first_name", "last_name"]
    
    class Meta:
        db_table = 'user'