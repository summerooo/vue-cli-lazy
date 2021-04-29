if [ "$1" == "build" ]; then
yarn build
fi
git pull origin master
git add .
if [ -n "$1" ]; then
  git commit -m $1
else
  git commit -m 'update'
fi
git push origin master
# if [ "$1" == "build" ]; then
# # yarn build
# # expect ftp.sh
# fi