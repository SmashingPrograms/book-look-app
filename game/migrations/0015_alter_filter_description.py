# Generated by Django 3.2.12 on 2022-03-21 02:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0014_auto_20220317_1419'),
    ]

    operations = [
        migrations.AlterField(
            model_name='filter',
            name='description',
            field=models.TextField(blank=True),
        ),
    ]
