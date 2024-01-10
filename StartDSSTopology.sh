#! /usr/bin/sh 
cd /home/sgsim/SmartGridSim/topologies
sudo mn --clean
sudo python3 ./DSSTopology.py
sqlite3 ../dbHandler/SGData.db "UPDATE infos SET PortConnected = 1 WHERE id=1"
sqlite3 ../dbHandler/SGData.db "UPDATE infos SET PortConnected = 1 WHERE id=2"
#bash

