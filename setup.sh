#!/bin/bash

sudo apt install curl
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
source ~/.bashrc
command -v nvm
source ~/.bashrc
export NVM_DIR=$HOME/.nvm;
source $NVM_DIR/nvm.sh;
nvm install v15.5.1
npm install -g create-react-app
sudo apt install mysql-server
