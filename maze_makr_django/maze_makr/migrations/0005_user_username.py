# Generated by Django 4.0.2 on 2022-02-10 21:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('maze_makr', '0004_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='username',
            field=models.CharField(default='', max_length=50),
        ),
    ]
