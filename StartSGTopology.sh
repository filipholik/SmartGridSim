#! /usr/bin/sh 
cd topologies
sudo mn --clean
sudo python3 ./SmartGridTopology.py
cd ../GUI
./initDatabase.sh
#bash

