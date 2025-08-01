from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

class CustomUser(AbstractUser):
    email = models.EmailField(
        _("email address"),
        unique = True,
        error_messages={
            "unique": _("A user with that email address already exists."),
        },
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    class Meta:
        db_table = 'user'
    
    def __str__ (self):
        return f"{self.email}"
    
    def __repr__ (self):
        return f"<CustomUser: {self.email}>"