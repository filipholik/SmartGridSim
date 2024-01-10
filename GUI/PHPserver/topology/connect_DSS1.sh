#!/bin/bash

ifconfig DSS1GW-eth2 up

sqlite3 ../dbHandler/SGData.db "UPDATE infos SET PortConnected = 1 WHERE id=1"