# Generated by Django 3.2.12 on 2022-03-17 14:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0013_auto_20220317_1324'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='signal',
            name='active',
        ),
        migrations.AddField(
            model_name='signal',
            name='author',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='signal',
            name='genre',
            field=models.TextField(blank=True, null=True),
        ),
    ]