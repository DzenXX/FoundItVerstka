<?php 

    if (isset($_POST["hintHTML"]) && isset($_POST["balloonTextHTML"]) && isset($_POST["balloonImgHTML"]) && isset($_POST["coordsLon"]) && isset($_POST["coordsLon"])) {

        $result = array(
            'hintHTML' => $_POST["hintHTML"],
            'balloonTextHTML' => $_POST["balloonTextHTML"],
            'balloonImgHTML' => $_POST["balloonImgHTML"],
            'coordsLat' => $_POST["coordsLat"],
            'coordsLon' => $_POST["coordsLon"],
        );

        $hintHTML = $_POST["hintHTML"];
        $balloonTextHTML = $_POST["balloonTextHTML"];
        $balloonImgHTML = $_POST["balloonImgHTML"];
        $coordsLat = $_POST["coordsLat"];
        $coordsLon = $_POST["coordsLon"];

        $json = json_encode($result); 
        echo $json;

    }

    if ( ($hintHTML != null) && ($balloonTextHTML != null) && ($balloonImgHTML != null) && ($coordsLat != null) && ($coordsLon != null)) {
        $conn = mysqli_connect("localhost", "root", "", "placemarksDatabase");
        if (!$conn) {
          die("Ошибка: " . mysqli_connect_error());
        }

        $res = $conn->query("SELECT count(*) FROM placemarks");
        $row = $res->fetch_row();
        $num = $row[0]+1;
       
        $sql = "INSERT INTO placemarks VALUES ($num, 'DBPlacemark$num', $coordsLat, $coordsLon, '$hintHTML', '$balloonTextHTML', '$balloonImgHTML')";
            if(mysqli_query($conn, $sql)){
            echo "Данные успешно добавлены";
        } else{
            //echo "Ошибка: " . mysqli_error($conn);
        }
        mysqli_close($conn);
    }

?>