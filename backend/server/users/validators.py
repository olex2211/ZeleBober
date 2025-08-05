from django.core.validators import RegexValidator
from django.utils.translation import gettext_lazy as _

phone_validator = RegexValidator(
        regex=r'^\+380\d{9}$',
        message=_("Phone number must be entered in the format: '+380123456789'."),
    )

letters_only_validator = RegexValidator(
        regex=r"^[^\W\d_]+(?:['\-]?[^\W\d_]+)*$",
        message=_("The field may include spaces, apostrophes and hyphens."),
    )