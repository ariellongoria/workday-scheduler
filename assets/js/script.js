$("#currentDay").html(moment().format("dddd, MMMM Do"));

events = [];

var saveEvents = function () {
    localStorage.setItem("events", JSON.stringify(events));
};

var loadEvents = function () {
    var storedEvents = JSON.parse(localStorage.getItem("events"));
    if (storedEvents) {
        for (i = 0; i < storedEvents.length; i++) {
            $("#" + storedEvents[i].id + " textarea").val(storedEvents[i].text);
        }
    }
    events = storedEvents;
};

var currentHour = moment().format("H");

for (hour = 9; hour < 18; hour++) {
    if (parseInt(currentHour) > hour) {
        $("#" + hour + " textarea").addClass("past");
    } else if (parseInt(currentHour) === hour) {
        $("#" + hour + " textarea").addClass("present");
    } else {
        $("#" + hour + " textarea").addClass("future");
    }
}

loadEvents();

$(".saveBtn").click(function () {
    var parentId = $(this).parent().attr("id");
    if (events) {
        for (var i = 0; i < events.length; i++) {
            if (parentId === events[i].id) {
                events.splice(i, 1);
            }
        }
    }
    var eventText = $("#" + parentId + " textarea").val();
    newEvent = {
        id: parentId,
        text: eventText,
    };

    events = events || [];
    events.push(newEvent);

    saveEvents();
});
