# from django.db import migrations

# from game.backend_scripts.gutenberg_pull import gutenberg_pull

# def forwards(apps, schema_editor):
#     if schema_editor.connection.alias != 'default':
#         return
#     # Your migration code goes here
#     gutenburg_data = gutenberg_pull()
#     passages = passages_create(gutenburg_data)

# class Migration(migrations.Migration):

#     dependencies = [
#       ('game', '0006_auto_20220314_1550')
#     ]

#     operations = [
#         migrations.RunPython(forwards),
#     ]
