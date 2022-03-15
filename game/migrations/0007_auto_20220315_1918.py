# Generated by Django 3.2.12 on 2022-03-15 19:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0006_auto_20220314_1550'),
    ]

    operations = [
        migrations.CreateModel(
            name='Signal',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('difficulty', models.IntegerField()),
                ('genre', models.TextField(blank=True)),
            ],
        ),
        migrations.AlterField(
            model_name='book',
            name='url',
            field=models.URLField(),
        ),
    ]
