# Generated by Django 3.2.12 on 2022-03-14 02:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0003_auto_20220313_0305'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='simple_title',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
    ]
