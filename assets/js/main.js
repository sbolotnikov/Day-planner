// global variable definitions
var currentDate;
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


function getAppointment(n) {
    // modal form 
    var tagInput;
    var tagLabel;
    $("#inputEvent").html("");
    $(".modal-footer").html("");
    $(".modal-title").text("Please input your event");
    $("#inputEvent").append('<form id="form1">');
    $('#form1').attr("method", "POST");


    tagInput=$('<input id="input0">');
    tagInput.attr('type', 'date');
    tagInput.attr('value' , moment(currentDate).format('YYYY-MM-DD'));
    tagLabel = $("<label for='input0'>Date: </label>");
    tagLabel.css("width",'100%');
    $("#form1").append(tagLabel, tagInput);


    // tagLabel.text(moment(currentDate).format('MM/DD/YYYY'));
    $("#form1").append(tagLabel);





    tagInput = $('<input id="input1">');
    tagInput.attr('type', 'text');
    tagInput.attr('placeholder', 'meeting with Peter');
    tagInput.css("width",'100%');
    tagLabel = $("<label for='input1'>Description: </label>");
    tagLabel.css("width",'100%');
    $("#form1").append(tagLabel, tagInput);
    tagInput = $('<input id="input2">');
    tagInput.attr('type', 'time');
     var de;
     if (n<10){
         de="0"+n+":00";
     }
     else{
         de= n+":00";
     }
    tagInput.attr('value' , de);  
    tagLabel = $("<label for='input2'>Apointment start time: </label>");
    tagLabel.css("width",'100%');
    $("#form1").append(tagLabel, tagInput);
    tagLabel=$("<h6>Appointment length: </h6>");
    tagLabel.css("width",'100%');
    $("#form1").append(tagLabel);
    tagInput = $('<input id="input3">');
    tagInput.attr('type', 'number');
    tagInput.attr('min', '0');
    tagInput.attr('max', '23');
    tagInput.attr('value' , 1); 
    tagLabel = $("<label for='input3'>Hours: </label>");
    $("#form1").append(tagLabel, tagInput);
    tagInput = $('<input id="input4">');
    tagInput.attr('type', 'number');
    tagInput.attr('min', '0');
    tagInput.attr('max', '59');
    tagInput.attr('value' , 0); 
    tagLabel = $("<label for='input4'> minutes</label>");
    $("#form1").append( tagInput, tagLabel);

    tagLabel=$('<button type="Submit">Submit</button>');
    tagLabel.attr("class",'btnSubmit');
    tagLabel.attr("form",'form1');
    tagLabel.attr("value",'Submit');
    $("div.modal-footer").append(tagLabel);

    

    // When form is submitted...
    $('#form1').submit(function (event) {
        event.preventDefault();
        var hourAppt=parseInt($("#input3").val());
        var minuteAppt=parseInt($("#input4").val());
        var timeAppt=$("#input2").val().toString();
        var descAppt=$("#input1").val();
        var hourStart=parseInt(timeAppt.slice(0,2));
        var minuteStart=parseInt(timeAppt.slice(3,5));

        console.log(hourAppt);
        console.log(minuteAppt);
        console.log(timeAppt);
        console.log(descAppt);
        console.log(hourStart);
        console.log(minuteStart);
        if(((hourAppt+hourStart)*60+(minuteStart+minuteAppt))>=24*60) {
            alert("Your appointment should start and finish same day. Try again");
            return;
        }
        if (descAppt===""){
            alert("Please enter appointment description");
            return;
        }
        // var dateAppt={

        //     moment(currentDate).set("hour",hourAppt);
        // dateAppt=moment(dateAppt).set("minute",minuteAppt);
    // }


        alert("submited" );
    });
}
function drawCalendar() {
    var hourNow;
    var dayHour;
    var tagDiv;
    hourNow = moment();
    dayHour = moment(currentDate);
    var hourVal = '';
    for (var i = 0; i < 24; i++) {
        $("#calendarList").append('<div class="row">');
        $("div.row:last-child").append('<div class="col-2" id="hourTag' + i + '"></div>');
        hourVal = moment().set('hour', i).format('h a');
        $('#hourTag' + i).text(hourVal);
        $("div.row:last-child").append('<div class="col-10"></div>');
        tagDiv = $("#hourTag" + i).next();
        tagDiv.attr("value", i);
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
    $("#myModal").css('display', 'none');
    $("div.col-10").attr("data-toggle", "modal");
    $("div.col-10").attr("data-target", "#myModal");
    $("div.col-10").click(function (event) {
        var ele = event.target;
        var index = ele.getAttribute('value')
        // console.log(index);
        getAppointment(index);
    });

}
drawCalendar();