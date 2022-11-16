<?php

    if (isset($_POST["lmao"])) {
        $conn = mysqli_connect("localhost", "root", "", "placemarksDatabase");
        if (!$conn) {
        die("Ошибка: " . mysqli_connect_error());
        }

        $res = $conn->query("SELECT count(*) FROM placemarks");
        $row = $res->fetch_row();
        $num = $row[0];

        $result = array();

        for ($i = 1; $i <= $num; $i++) {
            $temp1 = $conn->query("SELECT * FROM placemarks WHERE Id = $i");
            $temp2 = $temp1->fetch_row();
            $result[$i] = $temp2;
        }

        $json = json_encode($result); 
        echo $json;

        mysqli_close($conn);
    }

?>