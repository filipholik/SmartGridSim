<?php

    include "connectDb.php";
    $query = 'SELECT * FROM GOOSE WHERE id=1';
    $results = $db->query($query);
    while ($row = $results->fetchArray()) {
        $jsonArray[] = $row['id'];
        $jsonArray[] = $row['state'];
        $jsonArray[] = $row['value'];
        $jsonArray[] = $row['timestamp'];
    }
    
    echo json_encode($jsonArray);
    ?>
