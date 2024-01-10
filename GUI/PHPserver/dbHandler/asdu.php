<?php

    include "connectDb.php";
    $query = 'SELECT asdu FROM infos';
    $results = $db->query($query);
    while ($row = $results->fetchArray()) {

        $jsonArray[] = $row['asdu'];
    }
    
    echo json_encode($jsonArray);
    ?>
