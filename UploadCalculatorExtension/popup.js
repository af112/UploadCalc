function checkElement(element) {
    let elmnt = document.getElementById(element);
    let elementVal = parseFloat(elmnt.value);  // Attempt to convert the element value to a float

    if(isNaN(elementVal)) {    // Check if the value isn't a number
        elmnt.style.borderColor = "red";    // Make the borer color red
        elmnt.value = null; // Clear the element value
        console.log(element + " is invalid.");
    } else {
        elmnt.style.borderColor = "black";  // Make the border color black
        console.log(element + " is valid.");
    }
}

$('#fileSize').on('input', function() {
    checkElement('fileSize');
});

$('#uploadSpeed').on('input', function() {
    checkElement('uploadSpeed');
});