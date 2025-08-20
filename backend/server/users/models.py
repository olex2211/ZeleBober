from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django.core.validators import MinLengthValidator
from .validators import letters_only_validator

class User(AbstractUser):
    email = models.EmailField(
        _("email address"),
        unique = True,
        blank=False,
        error_messages={
            "unique": _("A user with that email address already exists."),
        },
    )

    first_name = models.CharField(
        _("first name"),
        blank=False,
        max_length=150,
        validators=[MinLengthValidator(3), letters_only_validator],
        error_messages={
            "min_length": _("The field must contain at least %(limit_value)d letters.")
        },
    )
    
    last_name = models.CharField(
        _("last name"),
        blank=False,
        max_length=150,
        validators=[MinLengthValidator(3), letters_only_validator],
        error_messages={
            "min_length": _("The field must contain at least %(limit_value)d letters.")
        },
    )

    photo = models.ImageField(upload_to="uploads/users/", blank=True, null=True)

    REQUIRED_FIELDS = []
    
    class Meta:
        db_table = 'user'