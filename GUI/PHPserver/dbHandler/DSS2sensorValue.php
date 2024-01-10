<?php

    include "connectDb.php";
    $query = 'SELECT value FROM DSS2SENSORS';
    $results = $db->query($query);
    while ($row = $results->fetchArray()) {

        $jsonArray[] = $row['value'];
    }
    
    echo json_encode($jsonArray);
    ?>
