# Generated by Django 3.2.12 on 2022-10-29 20:26

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('kanban', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='kanbancard',
            name='position',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='kanbancard',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='cards', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='kanbancolumn',
            name='position',
            field=models.PositiveIntegerField(default=0),
        ),
    ]