#!/bin/bash
#export DEBIAN_FRONTEND=noninteractive
echo "Installing dependencies";
sudo apt-get install libatlas-base-dev libjasper-dev libqtgui4 python3-pyqt5 libqt4-test python3 libhdf5-dev libhdf5-serial-dev libcblas-dev python-matplotlib python3-matplotlib -y -qq;
echo "Installing Python Modules";
pip install -r ./requirements.txt;
pip3 install -r ./requirements.txt;
python -m pip install matplotlib;
# Working camera modules for RaspberryPi4
python3 -m pip install opencv-python==4.1.0.25;


echo "Installed everything!";