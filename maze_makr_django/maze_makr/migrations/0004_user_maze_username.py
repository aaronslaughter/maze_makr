# Generated by Django 4.0.2 on 2022-02-11 00:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('maze_makr', '0003_maze_height_maze_width'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=100)),
            ],
        ),
        migrations.AddField(
            model_name='maze',
            name='username',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, related_name='mazes', to='maze_makr.user'),
        ),
    ]
