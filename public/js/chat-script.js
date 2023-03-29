let socket = io("/");

let name = "";
let roomId = "";

// Start when the document is ready
$(document).ready(function(){
    // Get the user name and room id from current URL
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    name = urlParams.get("name");
    roomId = urlParams.get("roomId");

    // Emit a message to the server 
    socket.emit("join-room", name, roomId);
});

// Catch the Emit sent fromthe srever and add the html
socket.on("user-connected", (userName) =>{
    let html = `
    <div class="row">
        <div class="col-12">
            ${userName} has just joined the room
        </div>
    </div>
    `
    $("#chat-area").append(html);
})

// Handle the click on the sent button
$(".send-msg").click(function(){
    let msg = $("#chat-msg").val();
    console.log(msg);
    if (msg !== ""){
        console.log("working");
        // Emit the user's message
        socket.emit("message", name, roomId, msg)
        let html = `
        <div class="row">
            <div class="col-12">
                Me : ${msg}
            </div>
        </div>
        `
        $("#chat-area").append(html);

        // reset the value of the input to "" , to clear it afte the msg is sent 
        $("#chat-msg").val("");
    }
});

// Detect when the Enter key is pressed, the call $(".send-msg").click() to send the message
$("#chat-msg").keydown(function(e){
    if(e.keyCode == 13){
        $(".send-msg").click();
    }
})

// Emit the received messages from other users 
socket.on("received-msg", (userName, msg) => {
    if (name !== userName){
        let html = `
        <div class="row">
            <div class="col-12">
                ${userName} : ${msg}
            </div>
        </div>
        `
        $("#chat-area").append(html);
    }
    
})

