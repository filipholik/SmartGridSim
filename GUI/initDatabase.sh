#!/bin/bash

cd PHPserver/dbHandler/
sqlite3 SGData.db "UPDATE infos SET PortConnected = 1 WHERE id=1"
sqlite3 SGData.db "UPDATE infos SET PortConnected = 1 WHERE id=2"
sqlite3 SGData.db "UPDATE infos SET state = 2 WHERE id=1"
sqlite3 SGData.db "UPDATE infos SET state = 2 WHERE id=2"
sqlite3 SGData.db "UPDATE GOOSE SET state = 0 WHERE id=1"
sqlite3 SGData.db "UPDATE GOOSE SET state = 0 WHERE id=4"
sqlite3 SGData.db "UPDATE SV SET state = 0 WHERE id=2"
sqlite3 SGData.db "UPDATE SV SET state = 0 WHERE id=3"
