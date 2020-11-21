
git pull origin master
git add .
if [ -n "$1" ]; then
  desc=$1
else
  desc='update'
fi
git commit -m desc
git push origin master
