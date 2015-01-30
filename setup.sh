#!/bin/sh

Green="\033[1;32m"
Color_Off="\033[0m"       # Text Reset

if [ -z "$1" ]
then

    git clone git@github.com:avil13/sceleton-front-end.git
    cd sceleton-front-end
    npm install
    bower install
    rm -rf ./.git

    echo -e "Была создана папка ${Green} sceleton-front-end ${Color_Off}"
else

    git clone git@github.com:avil13/sceleton-front-end.git $1
    cd $1
    npm install
    bower install
    rm -rf ./.git

    echo -e "Была создана папка ${Green} $1 ${Color_Off}"
fi

echo -e "\nИспользуйте программу сборки файлов с одним из параметров находясь в папке проекта:"
echo -e "${Green} gulp watch ${Color_Off}"
echo -e "${Green} gulp coffee ${Color_Off}"
echo -e "${Green} gulp less ${Color_Off}"
echo -e "${Green} gulp relise ${Color_Off}"