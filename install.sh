#!bin/bash
#export DEBIAN_FRONTEND=noninteractive
echo "Installing dependencies";
sudo apt-get install libatlas-base-dev libjasper-dev libqtgui4 python3-pyqt5 libqt4-test python3 -y -qq;
 
echo "Installing Python Modules";
pip3 install numpy matplotlib opencv-python ColorIt;
echo "Installed";