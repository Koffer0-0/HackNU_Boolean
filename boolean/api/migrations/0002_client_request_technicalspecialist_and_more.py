# Generated by Django 4.2 on 2023-04-15 08:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Client',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('address', models.CharField(max_length=200)),
                ('phone_number', models.CharField(max_length=20)),
                ('username', models.CharField(max_length=20)),
                ('email', models.EmailField(max_length=254)),
                ('password', models.CharField(max_length=128)),
            ],
        ),
        migrations.CreateModel(
            name='Request',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField()),
                ('request_type', models.CharField(max_length=100)),
                ('status', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='TechnicalSpecialist',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('username', models.CharField(max_length=20)),
                ('password', models.CharField(max_length=128)),
                ('members', models.ManyToManyField(related_name='team_members', to='api.technicalspecialist')),
            ],
        ),
        migrations.CreateModel(
            name='TechnicalSupportOperator',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=100)),
                ('second_name', models.CharField(max_length=100)),
                ('password', models.CharField(max_length=128)),
            ],
        ),
        migrations.RemoveField(
            model_name='customuser',
            name='groups',
        ),
        migrations.RemoveField(
            model_name='customuser',
            name='user_permissions',
        ),
        migrations.RemoveField(
            model_name='task',
            name='assigned_to',
        ),
        migrations.RemoveField(
            model_name='task',
            name='created_by',
        ),
        migrations.RemoveField(
            model_name='team',
            name='members',
        ),
        migrations.DeleteModel(
            name='Company',
        ),
        migrations.DeleteModel(
            name='CustomUser',
        ),
        migrations.DeleteModel(
            name='Task',
        ),
        migrations.DeleteModel(
            name='Team',
        ),
        migrations.AddField(
            model_name='request',
            name='assigned_by',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='created_requests', to='api.technicalsupportoperator'),
        ),
        migrations.AddField(
            model_name='request',
            name='assigned_to',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='assigned_requests', to='api.technicalspecialist'),
        ),
        migrations.AddField(
            model_name='request',
            name='created_by',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='created_requests', to='api.client'),
        ),
    ]
