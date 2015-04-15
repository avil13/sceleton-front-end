#!/bin/sh

Green="\033[1;32m"
Color_Off="\033[0m"       # Text Reset

if [ -z "$1" ]
then
    git clone git@github.com:avil13/sceleton-front-end.git
    cd sceleton-front-end
    echo -e "Была создана папка ${Green} sceleton-front-end ${Color_Off}"
else
    git clone git@github.com:avil13/sceleton-front-end.git $1
    cd $1
    echo -e "Была создана папка ${Green} $1 ${Color_Off}"
fi

npm install
rm -rf ./.git

echo -e "\nИспользуйте программу сборки файлов с одним из параметров находясь в папке проекта:"
echo -e "${Green} gulp watch ${Color_Off}"
echo -e "${Green} gulp js ${Color_Off}"
echo -e "${Green} gulp css ${Color_Off}"
echo -e "${Green} gulp relise ${Color_Off}"
echo -e "${Green} gulp server ${Color_Off}"

echo -e "\n \m/_(>_<)_\m/ \n"