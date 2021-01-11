var sheet = document.createElement('style'),
    $rangeInput = $('.range input'),
    prefs = ['webkit-slider-runnable-track', 'moz-range-track', 'ms-track'];

document.body.appendChild(sheet);

var getTrackStyle = function (slider, labelID) {
    var curVal = slider.value,
        style = '';

    // Set active label
    $("#" + labelID +" li").removeClass('active selected');

    var curLabel = $("#" + labelID).find('li:nth-child(' + curVal + ')');

    curLabel.addClass('active selected');

    return style;
}

function clicked(index, sliderID,labelID) {
    let slider = document.getElementById(sliderID)
    slider.value = index;
    sheet.textContent = getTrackStyle(slider,labelID);
}

function inputChange(sliderID,labelID) {
    sheet.textContent = getTrackStyle(document.getElementById(sliderID),labelID);
}
