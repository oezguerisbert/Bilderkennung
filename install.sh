#!/bin/bash
#export DEBIAN_FRONTEND=noninteractive
echo "Installing dependencies";
sudo apt-get install libatlas-base-dev libjasper-dev libqtgui4 python3-pyqt5 libqt4-test python3 -y -qq;
sudo apt-get install libhdf5-dev -y -qq;
sudo apt-get install libhdf5-serial-dev -y -qq;
sudo apt-get install libcblas-dev-y -qq;

echo "Installing Python Modules";
pip install -r ./requirements.txt;

echo "Installed";