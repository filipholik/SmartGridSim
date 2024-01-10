<?php

    include "connectDb.php";
    $query = 'SELECT timestamp FROM infos';
    $results = $db->query($query);
    while ($row = $results->fetchArray()) {

        $jsonArray[] = $row['timestamp'];
    }
    
    echo json_encode($jsonArray);
    ?>
