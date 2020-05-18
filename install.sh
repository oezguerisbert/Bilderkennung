#!bin/bash
export DEBIAN_FRONTEND=noninteractive
echo "Installing dependencies";
sudo apt-get install python -y -qq > /dev/null;
echo "Installing Python Modules";
pip install numpy matplotlib opencv-python ColorIt;
echo "Installed";
