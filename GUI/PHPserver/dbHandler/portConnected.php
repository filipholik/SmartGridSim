<?php

    include "connectDb.php";
    $query = 'SELECT PortConnected FROM infos';
    $results = $db->query($query);
    while ($row = $results->fetchArray()) {

        $jsonArray[] = $row['PortConnected'];
    }
    
    echo json_encode($jsonArray);
    ?>
