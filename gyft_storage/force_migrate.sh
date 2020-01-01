set -euxo pipefail

echo "Deleting migration files"
find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
find . -path "*/migrations/*.pyc"  -delete
echo "Backuping and removing database"
[ -e db.sqlite3.backup ] && rm db.sqlite3.backup
[ -e db.sqlite3 ] && mv db.sqlite3 db.sqlite3.backup
echo "Creating and running migrations"
python manage.py makemigrations
python manage.py migrate
echo "Initializing the database to a sane default"
python populate_database.py