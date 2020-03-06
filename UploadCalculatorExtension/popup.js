let fileSize = document.getElementById('fileSize');
let uploadSpeed = document.getElementById('uploadSpeed');

function checkElement(element) {
    let elmnt = document.getElementById(element);
    let elementVal = parseFloat(elmnt.value);  // Attempt to convert the element value to a float

    if(isNaN(elementVal) || elementVal < 0) {  // Check if the value isn't a number and that it isn't negative
        elmnt.style.boxShadow = '0px 0px 3px 1.35px red inset';    // Make the borer color red
        elmnt.value = null; // Clear the element value
    } else {
        elmnt.style.boxShadow = '0px 0px 0px 0px red inset';  // Make the border color black
        calculateTime(parseFloat(fileSize.value), parseFloat(uploadSpeed.value));   // Calculate the time to upload
    }
}

function calculateTime(size, speed) {
    if(size != null && speed != null && !isNaN(size) && !isNaN(speed)) {    // If both fields have valid values
        if (speed > 0) {    // Ensure the speed is greater than 0
            let sizeDropDown = document.getElementById('sizeDropDown');
            let speedDropDown = document.getElementById('speedDropDown');
            let time = 0;

            switch(sizeDropDown.value) {
                case 'MB':
                    switch(speedDropDown.value) {
                        case 'Mb':
                            time = (size * 8) / speed;  // MB @ Mb/s formula
                            break;
                        case 'MB':
                            time = size / speed;    // MB @ MB/s formula
                            break;
                    }
                    break;
                case 'GB':
                    switch(speedDropDown.value) {
                        case 'Mb':
                            time = (size * 8000) / speed;   // GB @ Mb/s formula
                            break;
                        case 'MB':
                            time = (size * 1000) / speed;   // GB @ MB/s formula
                            break;
                    }
                    break;
            }
            if(time == 'Infinity') {
                time = 0;
            }
            console.log(time + ' Seconds.');
            $('#uploadTime').text(time.toFixed(2).toString() + ' seconds');
        }
    } else {    // If the fields don't have valid values
        return; // Leave this function
    }
}

$('#sizeDropDown').on('change', function() {    // When the size drop down is changed
    calculateTime(parseFloat(fileSize.value), parseFloat(uploadSpeed.value));   // Calculate the time to upload
});

$('#speedDropDown').on('change', function() {   // When the speed drop down is changed
    calculateTime(parseFloat(fileSize.value), parseFloat(uploadSpeed.value));   // Calculate the time to upload
});

$('#fileSize').on('input', function() { // When the size input is changed
    checkElement('fileSize');   // Check the size element
});

$('#uploadSpeed').on('input', function() {  // When the speed input is changed
    checkElement('uploadSpeed');    // Check the speed element
});