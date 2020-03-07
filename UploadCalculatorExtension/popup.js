let fileSize = document.getElementById('fileSize');
let uploadSpeed = document.getElementById('uploadSpeed');

function checkElement(element) {
    let elmnt = document.getElementById(element);
    let val = elmnt.value;

    if(val.toString().match("[a-zA-Z]+")) { // Check if the newest input is a letter
        val = val.toString().slice(0, -1);  // Remove the last added input (the letter)
        elmnt.value = val;  // Update the input field
    }
    
    if(((val.toString().match(/\./g) || []).length) > 1) {  // Check how many decimal points have been added
        val = val.toString().slice(0, -1);  // Remove the last added input (the decimal point)
        elmnt.value = val;  // Update the input field
    }

    let elementVal = parseFloat(val);   // Attempt to convert the element value to a float

    if(isNaN(elementVal) || elementVal < 0) {  // Check if the value isn't a number and that it isn't negative
        elmnt.style.boxShadow = '0px 0px 3px 1.35px red inset'; // Make the borer color red
        elmnt.value = null; // Clear the element value
    } else {
        elmnt.style.boxShadow = '0px 0px 0px 0px black inset';  // Make the border color black
        calculateTime(parseFloat(fileSize.value), parseFloat(uploadSpeed.value));   // Calculate the time to upload
    }
}

function calculateTime(size, speed) {
    if(size != null && speed != null && !isNaN(size) && !isNaN(speed)) {    // If both fields have valid values
        if (speed > 0) {    // Ensure the speed is greater than 0
            let sizeDropDown = document.getElementById('sizeDropDown');
            let speedDropDown = document.getElementById('speedDropDown');
            let time = 0;
            let multiplier = 0;

            switch(sizeDropDown.value) {
                case 'KB':  // KB multiplier
                    switch(speedDropDown.value) {
                        case 'Kb':
                            multiplier = 8; // Kb multiplier
                            break;
                        case 'KB':
                            multiplier = 1; // KB multiplier
                            break;
                        case 'Mb':
                            multiplier = 0.008;  // Mb multiplier
                            break;
                        case 'MB':
                            multiplier = 0.001;  // MB multiplier
                            break;
                    }
                    break;
                case 'MB':  // MB multiplier
                    switch(speedDropDown.value) {
                        case 'Kb':
                            multiplier = 8000; // Kb multiplier
                            break;
                        case 'KB':
                            multiplier = 1000; // KB multiplier
                            break;
                        case 'Mb':
                            multiplier = 8;  // Mb multiplier
                            break;
                        case 'MB':
                            multiplier = 1;  // MB multiplier
                            break;
                    }
                    break;
                case 'GB':  // GB multiplier
                    switch(speedDropDown.value) {
                        case 'Kb':
                            multiplier = 8000000; // Kb multiplier
                            break;
                        case 'KB':
                            multiplier = 1000000; // KB multiplier
                            break;
                        case 'Mb':
                            multiplier = 8000;  // Mb multiplier
                            break;
                        case 'MB':
                            multiplier = 1000;  // MB multiplier
                            break;
                    }
                    break;
            }

            time = (size * multiplier) / speed; // Calculate the time to upload
            if(time == 'Infinity' || time < 1) {    // If the time comes out as infinity or is less than 1
                time = 1;   // Set time to 1
            }
            displayTime(time.toFixed(2));  // Format & display the time
        }
    } else {    // If the fields don't have valid values
        return; // Leave this function
    }
}

function displayTime(time) {
    let dateTime = new Date(time * 1000);   // Create date object from time in milliseconds (seconds * 1000)
    let hours = dateTime.getUTCHours(); // Get the hours
    let minutes = dateTime.getUTCMinutes(); // Get the minutes
    let seconds = dateTime.getUTCSeconds(); // Get the seconds
    let formattedTime = '';
    
    if(hours > 0) { // If the time is over 1 hour
        let hrs = '';
        let mins = '';

        if (hours == 1) {
            hrs = 'hr';
        } else {
            hrs = 'hrs';
        }

        if (minutes == 1) {
            mins = 'min';
        } else {
            mins = 'mins';
        }
        formattedTime = hours.toString() + ' ' + hrs.toString() + ' ' + minutes.toString() + ' ' + mins.toString(); // Format as hh:mm
    } else if(minutes > 0) {    // If the time is less than 1 hour but over 1 minute
        let mins = '';
        let secs = '';

        if (minutes == 1) {
            mins = 'min';
        } else {
            mins = 'mins';
        }

        if (seconds == 1) {
            secs = 'sec';
        } else {
            secs = 'secs';
        }
        formattedTime = minutes.toString() + ' ' + mins.toString() + ' ' + seconds.toString() + ' ' + secs.toString();  // Format as mm:ss
    } else if(seconds > 0) { // If the time is less than 1 minute but over 1 second
        let secs = '';

        if (seconds == 1) {
            secs = 'sec';
        } else {
            secs = 'secs';
        }
        formattedTime = seconds.toString() + ' ' + secs.toString(); // Format as ss
    }
    $('#uploadTime').text(formattedTime); // Display the time
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