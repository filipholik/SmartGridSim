#! /usr/bin/sh 
cd /home/sgsim/SmartGridSim/topologies
sudo mn --clean
sudo python3 ./SmartGridTopology.py
cd /home/sgsim/SmartGridSim/GUI
./initDatabase.sh
#bash

