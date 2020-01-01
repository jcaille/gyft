import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE','gyft_storage.settings')

import django
django.setup()

from django.contrib.auth.models import User;
from django.core.management import call_command
from django.core.management.commands import flush
from gyft.models import GiftList

def create_super_user():
    superuser: User = User.objects.create_superuser('admin', 'admin@example.com', 'admin')
    print(f" - Superuser {superuser} - was created (password admin)")

def create_user(username):
    user = User.objects.create_user(username, email=None, password=None)
    print(f" - User {user} - was created")
    return user

def create_gift_lists(title, description, recipient):
    data, created = GiftList.objects.get_or_create(
        title = title, 
        description = description, 
        recipient = recipient)
    print(f" - {data} - was created {created}")
    return data

def populate():
    create_super_user()

    jean = create_user("Jean")
    pierre = create_user("Pierre")
    alida = create_user("Alida")
    corinne = create_user("Corinne")
    bertrand = create_user("Bertrand")
    soraya = create_user("Soraya")

    create_gift_lists("Initial gift list", "This is a description for the first gift list", jean)
    create_gift_lists("Another gift list", "This one has a short description", alida)
    create_gift_lists("A third list of gifts", "", soraya)

if __name__ == "__main__":
    
    # /!\ Drop everything /!\
    cmd = flush.Command()
    call_command(cmd, verbosity=0, interactive=False)
    # /!\ Drop everything /!\   

    populate()