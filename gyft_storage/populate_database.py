import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE','gyft_storage.settings')

import django
django.setup()

from django.contrib.auth.models import User;
from django.core.management import call_command
from django.core.management.commands import flush
from gyft.models import GiftList, Gift

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

def create_gift(title, description, cost, gift_list, creator):
    data, created = Gift.objects.get_or_create(
        title=title,
        description=description,
        cost=cost,
        gift_list=gift_list,
        created_by=creator)

    print(f" - {data} - was created {created}")
    return data

def populate():
    create_super_user()

    jean = create_user("Jean")
    alida = create_user("Alida")
    corinne = create_user("Corinne")
    soraya = create_user("Soraya")

    christmas = create_gift_lists("Jean's Christmas", "Let's get him some presents", jean)
    a_birthday = create_gift_lists("Alida's birthday", "A new list for things she wishes for", alida)

    create_gift("Watch", "A nice watch", 200, christmas, alida)
    create_gift("Pokemon Shield", "On switch please", 60, christmas, soraya)
    create_gift("AirPods Pro", "He mentionned it a while ago", 275, christmas, corinne)
    create_gift("Pants", "Maybe a nice pair of red cargo pants?", 50, christmas, jean)

    create_gift("Notebook", "With personalized photos", 15, a_birthday, jean)
    create_gift("Loto des Senteurs", "", 25, a_birthday, alida)
    create_gift("Kettle", "She loves tea !", 20, a_birthday, soraya)

if __name__ == "__main__":
    
    # /!\ Drop everything /!\
    cmd = flush.Command()
    call_command(cmd, verbosity=0, interactive=False)
    # /!\ Drop everything /!\   

    populate()