# To Run:
# ./setup.sh <FACEBOOK_APP_ID> <FACEBOOK_APP_SECRET>

# installing nvm and node
sudo apt-get update;
sudo apt-get install build-essential libssl-dev;
curl -sL https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh -o install_nvm.sh;
bash install_nvm.sh;
source ~/.profile;
nvm install --lts;
nvm use --lts;

# installing mongodb
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6;
echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list;
sudo apt-get update;
sudo apt-get install mongodb-org;
sudo systemctl enable mongod;
sudo systemctl start mongod;

# creating .env

export NODE_ENV=test
export FACEBOOK_APP_ID=$1
export FACEBOOK_APP_SECRET=$2
