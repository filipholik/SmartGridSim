<?php

    include "connectDb.php";
    $query = 'SELECT state FROM SV WHERE id=3';
    $results = $db->query($query);
    while ($row = $results->fetchArray()) {

        $jsonArray[] = $row['state'];
    }
    
    echo json_encode($jsonArray);
    ?>
