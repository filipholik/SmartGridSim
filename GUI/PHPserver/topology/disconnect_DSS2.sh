#!/bin/bash

ifconfig DSS2GW-eth2 down

sqlite3 ../dbHandler/SGData.db "UPDATE infos SET PortConnected = 0 WHERE id=2"