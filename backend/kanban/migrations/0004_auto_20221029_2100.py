# Generated by Django 3.2.12 on 2022-10-29 21:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('kanban', '0003_auto_20221029_2052'),
    ]

    operations = [
        migrations.AlterField(
            model_name='kanbancard',
            name='name',
            field=models.CharField(max_length=120, verbose_name='Card name'),
        ),
        migrations.AlterField(
            model_name='kanbancolumn',
            name='name',
            field=models.CharField(max_length=120, verbose_name='List name'),
        ),
    ]