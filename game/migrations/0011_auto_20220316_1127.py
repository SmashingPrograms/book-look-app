# Generated by Django 3.2.12 on 2022-03-16 11:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0010_remove_signal_active'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='signal',
            name='passages',
        ),
        migrations.AddField(
            model_name='signal',
            name='active',
            field=models.BooleanField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='signal',
            name='book_author',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='signal',
            name='book_title',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='signal',
            name='book_year',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='signal',
            name='passage_after',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='signal',
            name='passage_before',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='signal',
            name='prompt_passage',
            field=models.TextField(blank=True, null=True),
        ),
    ]
