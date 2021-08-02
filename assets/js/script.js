var todaysDate = $("#currentDay");
var planner = $(".planner");
var workHourArray = [{
        id: '9AM',
        start: '09:00:00',
        end: '09:59:59',
    },
    {
        id: '10AM',
        start: '10:00:00',
        end: '10:59:59',
    },
    {
        id: '11AM',
        start: '11:00:00',
        end: '11:59:59',
    },
    {
        id: '12PM',
        start: '12:00:00',
        end: '12:59:59',
    },
    {
        id: '1PM',
        start: '13:00:00',
        end: '13:59:59',
    },
    {
        id: '2PM',
        start: '14:00:00',
        end: '14:59:59',
    },
    {
        id: '3PM',
        start: '15:00:00',
        end: '15:59:59',
    },
    {
        id: '4PM',
        start: '16:00:00',
        end: '16:59:59',
    },
    {
        id: '5PM',
        start: '17:00:00',
        end: '17:59:59',
    }
];
var saveButton = $('.saveBtn');
var currentDay = moment().format('dddd, MMMM Do YYYY');
var currentTime = moment().format('HH:mm:ss'); //update format to be compared to start and end
//display today's date
todaysDate.text(currentDay);

//for loop updates colors in table
for (var workHour of workHourArray) {
    if (currentTime > workHour.end) {
        $('.row#' + workHour.id).addClass('past');
    }
    if (currentTime > workHour.start && currentTime < workHour.end) {
        $('.row#' + workHour.id).addClass('present');
    }
    if (currentTime < workHour.start) {
        $('.row#' + workHour.id).addClass('future');
    }
}

//event listener and function to store text in textarea elements
saveButton.on('click', function storeEvent(event) {
    saveButton = $(event.target);
    var textAreaBlock = saveButton.parent().find('textarea');
    var textAreaContent = textAreaBlock.val();
    var buttonKey = saveButton.data('time');
    localStorage.setItem("textAreaKey" + buttonKey, JSON.stringify(textAreaContent))
});

//function to check for and display any notes that exist in local storage
function renderPreviousNotes() {
    for (i = 0; i < workHourArray.length; i++) {
        var previousNote = JSON.parse(localStorage.getItem("textAreaKey" + workHourArray[i].id));
        $(planner).find(`[data-time='${workHourArray[i].id}']`).val(previousNote);
    }
}

function init() {
    renderPreviousNotes();
}

init();