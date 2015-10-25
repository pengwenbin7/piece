<?php

$total = intval($_POST["total"]);
$pos = intval($_POST["pos"]);
$uploadDate = $_POST["upload_date"];
$fileName = $_POST["file_name"];

if ($total == 1) {
    // only a segment
    $saveName = $uploadDate. $fileName;
    move_uploaded_file($_FILES["segment"]["tmp_name"], $saveName);
    echo $saveName;
} else if ($pos < $total) {
    // file segments greater than 1
    if (!file_exists($uploadDate)) {
        mkdir($uploadDate);
    }
    $saveName = $uploadDate. "/". $pos;
    move_uploaded_file($_FILES["segment"]["tmp_name"], $saveName);
    echo 1;
} else if ($pos == $total) {
    mergeFiles($uploadDate, $fileName);
    echo $uploadDate, $fileName;
} else {
    echo 0;
}

// the function just effect this file, not common one
function mergeFiles($dir, $fileName) {
    if (touch($dir. $fileName)) {
        // 'wb' mode can use in Windows OS
        $fileOut = fopen($dir. $fileName, "wb");
    } else {
        echo 0;
        die("Can't create file");
    }
    $files = scandir($dir);
    $total = count($files);
    for ($i = 0; $i < $total - 2; $i++) {
        $fileSegment = fopen($dir. "/". $i, "rb");
        $contents = fread($fileSegment, filesize($dir. "/". $i));
        fwrite($fileOut, $contents);
        fflush($fileOut);
        fclose($fileSegment);
    }
    fclose($fileOut);
}