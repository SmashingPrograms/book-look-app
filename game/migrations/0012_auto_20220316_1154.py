# Generated by Django 3.2.12 on 2022-03-16 11:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0011_auto_20220316_1127'),
    ]

    operations = [
        migrations.AddField(
            model_name='signal',
            name='book_genre',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='signal',
            name='expected_words',
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='signal',
            name='word_choices',
            field=models.JSONField(blank=True, null=True),
        ),
    ]