#!/bin/bash
#export DEBIAN_FRONTEND=noninteractive
echo "Installing dependencies";
sudo apt-get install libatlas-base-dev libjasper-dev libqtgui4 python3-pyqt5 libqt4-test python3 libhdf5-dev libhdf5-serial-dev libcblas-dev python-matplotlib python3-matplotlib -y -qq;
echo "Installing Python Modules";
pip3 install -r ./requirements.txt;

echo "Installed";