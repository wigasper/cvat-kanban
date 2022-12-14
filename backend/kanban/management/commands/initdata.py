from django.core.management import BaseCommand, call_command
from django.contrib.auth.models import User


class Command(BaseCommand):
    help = "DEV COMMAND: Add fixture data"

    def handle(self, *args, **options):
        call_command("loaddata", "init")

        for user in User.objects.all():
            user.set_password(user.password)
            user.save()
