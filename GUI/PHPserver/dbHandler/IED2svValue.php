<?php

    include "connectDb.php";
    $query = 'SELECT * FROM SV WHERE id=2';
    $results = $db->query($query);
    while ($row = $results->fetchArray()) {

        $jsonArray[] = $row['id'];
        $jsonArray[] = $row['data0'];
        $jsonArray[] = $row['data1'];
        $jsonArray[] = $row['state'];
    }
    
    echo json_encode($jsonArray);
    ?>
