// js scrips
$(".submit-btn").click(async function(){ 
    let data = {
        name: $("#name").val(),
        roomId: $("#roomId").val()
    };
    if (data.name === ""){
        alert("Name is required");
    } else {
        if (data.roomId === ""){
            // Make a post request using ajax
        await $.ajax({
            "type": "get", // Request type
            "url": "/generate-room-Id", // request route
            "success": function(res){
                // save three generated room Id to the data
                data.roomId = res.roomId
            }
        })
        }
        console.log(data);  
    };
    // Redirect to this URL
    window.location.href = `/chat?name=${data.name}&roomId=${data.roomId}`;
});

// Paused at 1:02:11