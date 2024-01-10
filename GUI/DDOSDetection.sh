#!/bin/bash

old_packets1=0
old_packets2=0
DDOS1=0
DDOS2=0
packets_limits=100

sqlite3 PHPserver/dbHandler/SGData.db "UPDATE infos SET DDOS = 0 WHERE id=1"

sqlite3 PHPserver/dbHandler/SGData.db "UPDATE infos SET DDOS = 0 WHERE id=2"

while true; do
    packets1=$(awk '$1 == "DSS2GW-eth2:"{print $3}' /proc/net/dev)
    if ((old_packets1)); then
        clear
        # the variable rate contains the packets1/seconds
        rate1=$(bc <<< "($packets1 - $old_packets1)")
        echo "DSS2: $rate1 packets/seconds"

        if ((rate1>packets_limits)) && ((DDOS1 == 0)); then
            sqlite3 PHPserver/dbHandler/SGData.db "UPDATE infos SET DDOS = 1 WHERE id=2"
            DDOS1=1
        fi
        if ((rate1<packets_limits)) && ((DDOS1 == 1));then
            sqlite3 PHPserver/dbHandler/SGData.db "UPDATE infos SET DDOS = 0 WHERE id=2"
            DDOS1=0
        fi
    fi
    old_packets1=$packets1

    packets2=$(awk '$1 == "DSS1GW-eth2:"{print $3}' /proc/net/dev)
    if ((old_packets2)); then
        # the variable rate contains the packets1/seconds
        rate2=$(bc <<< "($packets2 - $old_packets2)")
        echo "DSS1: $rate2 packets/seconds"
        if ((rate2>packets_limits)) && ((DDOS2 == 0)); then
            sqlite3 PHPserver/dbHandler/SGData.db "UPDATE infos SET DDOS = 1 WHERE id=1"
            DDOS2=1
        fi
        if ((rate2<packets_limits)) && ((DDOS2== 1)); then
            sqlite3 PHPserver/dbHandler/SGData.db "UPDATE infos SET DDOS = 0 WHERE id=1"
            DDOS2=0
        fi

    fi
    old_packets2=$packets2

    sleep 1
done