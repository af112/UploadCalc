function checkUploadSpeed() {
    let uploadSpeed = document.getElementById('uploadSpeed');
    let uploadSpeedVal = parseFloat(uploadSpeed.value); // Attempt to convert the upload speed value to a float

    if(isNaN(uploadSpeedVal)) {    // Check if the value isn't a number
        uploadSpeed.style.borderColor = "red";    // Make the borer color red
        uploadSpeed.value = null; // Clear the element value
        console.log("Upload speed is invalid.");
    } else {
        uploadSpeed.style.borderColor = "black";  // Make the border color black
        console.log("Upload speed is valid.");
    }
}

function checkFileSize() {
    let fileSize = document.getElementById('fileSize');
    let fileSizeVal = parseFloat(fileSize.value);   // Attempt to convert the file size value to a float

    if(isNaN(fileSizeVal)) {    // Check if the value isn't a number
        fileSize.style.borderColor = "red";    // Make the borer color red
        fileSize.value = null; // Clear the element value
        console.log("File size is invalid.");
    } else {
        fileSize.style.borderColor = "black";  // Make the border color black
        console.log("File size is valid.");
    }
}