<?php

    include "connectDb.php";
    $query = 'SELECT state FROM GOOSE WHERE id=1';
    $results = $db->query($query);
    while ($row = $results->fetchArray()) {

        $jsonArray[] = $row['state'];
    }
    
    echo json_encode($jsonArray);
    ?>
