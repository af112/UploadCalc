/* let fileSize = document.getElementById('fileSize');
let uploadSpeed = document.getElementById('uploadSpeed'); */
let calculateButton = document.getElementById('calculateButton');

calculateButton.onclick = function(element) {
    checkValid("fileSize"); // Check the validity of the file size element
    checkValid("uploadSpeed");  // Check the validity of the upload speed element

    /*
    let isValid = true;

    if(isValid == true) {
        console.log("Both values are valid!");
    } */
};

function checkValid(element) {
    let elmnt = document.getElementById(element);    // Get the HTML element
    let val = parseFloat(elmnt.value);  // Attempt to convert the element value to a float
    if(isNaN(val)) {    // Check if the value isn't a number
        elmnt.style.borderColor = "red";    // Make the borer color red
        elmnt.value = null; // Clear the element value
    } else {
        elmnt.style.borderColor = "black";  // Make the border color black
    }
}