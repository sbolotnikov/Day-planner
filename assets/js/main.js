// global variable definitions
var currentDate;
var appointments = [];

moment().get(currentDate);
$("#currentDay").text(moment(currentDate).format('dddd, MMMM Do YYYY'));


$("#dayBack").click(function () {
    currentDate = moment(currentDate).subtract(1, 'days');
    $("#currentDay").text(moment(currentDate).format('dddd, MMMM Do YYYY'));
    drawCalendar();
});
$("#dayForward").click(function () {
    currentDate = moment(currentDate).add(1, 'days');
    $("#currentDay").text(moment(currentDate).format('dddd, MMMM Do YYYY'));
    drawCalendar();
});
$("#closeBtn").click(function () {
    drawCalendar();
});
function storeResults() {
    // Stringify and send results in localStorage 
    localStorage.setItem("appointments", JSON.stringify(appointments));
}

function appointmentsFromStorage() {
    // retrive appointments from storage
    var storedResults = JSON.parse(localStorage.getItem("appointments"));
    // If  were retrieved from localStorage, update appointments array it
    if (storedResults !== null) {
        appointments = storedResults;
    }

}
function getAppointment(n, aInd) {
    // modal form 
    var tagInput;
    var tagLabel;
    $("#inputEvent").html("");
    $(".modal-footer").html("");
    $(".modal-title").text("Please input your event");
    $("#inputEvent").append('<form id="form1">');
    $('#form1').attr("method", "POST");
    tagInput = $('<input id="input0">');
    tagInput.attr('type', 'date');
    tagInput.attr('value', moment(currentDate).format('YYYY-MM-DD'));
    tagLabel = $("<label for='input0'>Date: </label>");
    tagLabel.css("width", '100%');
    $("#form1").append(tagLabel, tagInput);
    $("#form1").append(tagLabel);
    tagInput = $('<input id="input1">');
    tagInput.attr('type', 'text');
    tagInput.attr('placeholder', 'meeting with Peter');
    tagInput.css("width", '100%');
    tagLabel = $("<label for='input1'>Description: </label>");
    tagLabel.css("width", '100%');
    if (aInd != -1) {
        tagInput.val(appointments[aInd].description);
    }
    $("#form1").append(tagLabel, tagInput);
    tagInput = $('<input id="input2">');
    tagInput.attr('type', 'time');
    var de;
    if (aInd != -1) {
        de = appointments[aInd].time;
    }
    else {
        if (n < 10) {
            de = "0" + n + ":00";
        }
        else {
            de = n + ":00";
        }
    }
    tagInput.attr('value', de);
    tagLabel = $("<label for='input2'>Apointment start time: </label>");
    tagLabel.css("width", '100%');
    $("#form1").append(tagLabel, tagInput);
    tagLabel = $("<h6>Appointment length: </h6>");
    tagLabel.css("width", '100%');
    $("#form1").append(tagLabel);
    tagInput = $('<input id="input3">');
    tagInput.attr('type', 'number');
    tagInput.attr('min', '0');
    tagInput.attr('max', '23');
    tagInput.attr('value', 1);
    tagLabel = $("<label for='input3'>Hours: </label>");
    if (aInd != -1) {
        var len = Math.floor(appointments[aInd].lengthA / 60);
        tagInput.attr('value', len);
    }
    $("#form1").append(tagLabel, tagInput);
    tagInput = $('<input id="input4">');
    tagInput.attr('type', 'number');
    tagInput.attr('min', '0');
    tagInput.attr('max', '59');
    tagInput.attr('value', 0);
    tagLabel = $("<label for='input4'> minutes</label>");
    if (aInd != -1) {
        var len = appointments[aInd].lengthA - (len * 60);
        tagInput.attr('value', len);
    }
    $("#form1").append(tagInput, tagLabel);
    tagLabel = $('<button type="Submit">Submit</button>');
    tagLabel.attr("class", 'btnSubmit');
    tagLabel.attr("form", 'form1');
    // tagLabel.attr('data-dismiss','modal');
    
    $("div.modal-footer").append(tagLabel);
    // When form is submitted...
    $('#form1').submit(function (event) {
        event.preventDefault();
        var hourAppt = parseInt($("#input3").val());
        var minuteAppt = parseInt($("#input4").val());
        var timeAppt = $("#input2").val().toString();
        var descAppt = $("#input1").val();
        var hourStart = parseInt(timeAppt.slice(0, 2));
        var minuteStart = parseInt(timeAppt.slice(3, 5));
        if (((hourAppt + hourStart) * 60 + (minuteStart + minuteAppt)) >= 24 * 60) {
            alert("Your appointment should start and finish same day. Try again");
            return;
        }
        if (descAppt === "") {
            alert("Please enter appointment description");
            return;
        }

        // Add new localResults to appointments array
        var localRes = {
            "description": "",
            "date": "",
            "time": "",
            "lengthA": 0
        };
        localRes.description = descAppt;
        localRes.date = $("#input0").val();
        localRes.time = timeAppt;
        localRes.lengthA = hourAppt * 60 + minuteAppt;
        if (aInd != -1) {
            appointments[aInd]=localRes;
        } else {
            appointments.push(localRes);
        }
        storeResults();
        drawCalendar()
        console.log(appointments);
    });
}
function clearDay() {
    $("#outer").html("");
    $("#outer").append("<div id='calendarList'>");
}

// function DragEve(event){
//     alert ("coordinates 0"+screenY);
// }
// function drop(event) {
//     alert ("coordinates 0"+screenY);
// }

function drawCalendar() {
    var hourNow;
    var dayHour;
    var tagDiv;
    hourNow = moment();
    dayHour = moment(currentDate);
    var hourVal = '';
    clearDay();

    for (var i = 0; i < 24; i++) {
        $("#calendarList").append('<div class="row">');
        $("div.row:last-child").append('<div class="col-2" id="hourTag' + i + '"></div>');
        hourVal = moment().set('hour', i).format('h a');
        $('#hourTag' + i).text(hourVal);
        $("div.row:last-child").append('<div class="col-10"></div>');
        tagDiv = $("#hourTag" + i).next();
        tagDiv.attr("value", i);
        tagDiv.css("border", "0.5px dotted lightgrey");
        dayHour.set('hour', i);
        if (moment(dayHour).isBefore(hourNow)) {
            tagDiv.css("background-color", 'grey');
        }
        else {
            tagDiv.css("background-color", 'green');
        }
        if (Math.abs(moment.duration(dayHour.diff(hourNow)).as('minutes')) < 30) {
            tagDiv.css("background-color", 'red');
        }
    }
    $("div.col-10").attr("data-toggle", "modal");
    $("div.col-10").attr("data-target", "#myModal");
    $("div.col-10").click(function (event) {
        var ele = event.target;
        var index = ele.getAttribute('value')
        // console.log(index);
        getAppointment(index, -1);
    });
    appointmentsFromStorage();
    var hourPoint = 0;
    var minutePoint = 0;
    var parentHour;
    for (var i = 0; i < appointments.length; i++) {
        if (appointments[i].date === moment(currentDate).format('YYYY-MM-DD')) {
            hourPoint = parseInt(appointments[i].time.slice(0, 2));
            minutePoint = parseInt(appointments[i].time.slice(3, 5));
            parentHour = $('#hourTag' + hourPoint).next();
            $("#outer").append(`<div class='appointment'>`);
            appoint = $("div.appointment").last();
            appoint.css("position", "absolute");
            appoint.css("top", parentHour.position().top + (minutePoint / 60 * parentHour.height()));
            appoint.css("left", parentHour.position().left);
            appoint.height(parentHour.height() * appointments[i].lengthA / 60);
            appoint.width(parentHour.outerWidth(true));
            appoint.css("background-color", "yellow");
            appoint.append(`<div class="row"  id='ap${i}'>`);
            // drageable???
            $("#ap" + i).append('<div class="col-10" draggable="true" ondrag="DragEve(event)" ><p class="desAppt">' + appointments[i].description + '</p></div>');
            $("#ap" + i).append('<div class="col-2"><button class="smBtn" id="smBtn'+i+'">&times;</button></div>');
            $(".desAppt").attr("data-toggle", "modal");
            $(".desAppt").attr("data-target", "#myModal");
            $(".desAppt").on("click", function (event) {
                var ind=parseInt($(this).parent().parent().get(0).id.substring(2));
                getAppointment(hourPoint,ind);
            });
            
            $("#smBtn"+i).on("click", function (event) {
                var ind=parseInt($(this).get(0).id.substring(5));
                appointments.splice(ind, 1);
                storeResults();
                drawCalendar();
            });

        }
    }


}
drawCalendar();