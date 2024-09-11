<?php
// Check if the form has been submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the uploaded file information
    $target_dir = "uploads/"; // Replace with your desired upload directory
    $target_file = $target_dir . basename($_FILES["image"]["name"]);
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

    // Check if   
 the file is an image
    if (getimagesize($_FILES["image"]["tmp_name"])   
 === false) {
        echo "Sorry, only image files are allowed.";
        $uploadOk = 0;
    }

    // Check if the file already exists
    if (file_exists($target_file)) {
        echo "Sorry, file already exists.";
        $uploadOk = 0;
    }

    // Check file size
    if ($_FILES["image"]["size"]   
 > 5000000) { // Adjust the maximum file size as needed
        echo "Sorry, the file is too large.";
        $uploadOk = 0;
    }

    // Allow certain file formats
    if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
    && $imageFileType != "gif") {
        echo "Sorry, only JPG,   
 PNG, JPEG, and GIF files are allowed.";
        $uploadOk = 0;   

    }

    // If everything is okay, try to upload the file
    if ($uploadOk == 1) {
        if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
            // Save the article data (title, content, and image filename) to a database or file
            // Replace the placeholder with your database connection or file handling code
            $title = $_POST['title'];
            $content = $_POST['content'];
            $image = $target_file; // Assuming the image is saved in the specified directory
            // ... save the data ...

            echo "The file ". basename($_FILES["image"]["name"]). " has been uploaded.";
        } else {
            echo "Sorry, there was an error uploading your file.";
        }
    }
}
?>