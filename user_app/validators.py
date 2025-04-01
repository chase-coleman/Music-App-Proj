from django.core.exceptions import ValidationError
import re 


class CustomPasswordValidator:
    def validate(self, password, user=None):
        regex = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*?]).{8,30}$'
        if not re.match(regex, password):
            raise ValidationError(
                "Password must have 8-30 characters, at least 1 capital letter, "
                "1 lowercase letter, 1 number and 1 special character."
            )

    def get_help_text(self):
        return "Your password must have 8-30 characters, include uppercase and lowercase letters, a number, and a special character."