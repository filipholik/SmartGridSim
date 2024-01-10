#!/bin/bash

ifconfig DSS1GW-eth2 down

sqlite3 ../dbHandler/SGData.db "UPDATE infos SET PortConnected = 0 WHERE id=1"