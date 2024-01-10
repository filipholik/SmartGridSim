<?php

    include "connectDb.php";
    $query = 'SELECT DDOS FROM infos';
    $results = $db->query($query);
    while ($row = $results->fetchArray()) {

        $jsonArray[] = $row['DDOS'];
    }
    
    echo json_encode($jsonArray);
    ?>
