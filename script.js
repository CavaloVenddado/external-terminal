console.log('Hello World!'); //just a silly debug

/**
 * Here you are going to define all the commands
 * it is important for the string to be the same as what the websocket provides.
 */
const Commands = {
	OpenByUser: "manual-open",
	OpenByCard: "1",
	OpenByFace: "2",
	CardDenied: "3",
    FaceDenied: "4",
    Message:"5"
}

/*connect to JARVIS websocket*/
var socket = new WebSocket('ws://raspi2server:1880/term/socket');



socket.onopen = function (event) {
    console.log('WebSocket is connected! Protocol:' + socket.protocol);
};

socket.onmessage = function (e) {
    /*this runs upon receiving message, we expect a json*/
    console.log('Server: ' + e.data);
    var req = JSON.parse(e.data); //parse data
    switch(req.event){
        case Commands.OpenByUser:
            var mydiv = document.getElementById("feedback-div")
            var myVideo = mydiv.getElementsByTagName("video")[0];
            var myMessage = mydiv.getElementsByTagName("p")[0];
            //finds and sets source value, loading the video
            mydiv.getElementsByTagName("source")[0].src = "media/cadeado_aberto0001-0120.mp4";
            myVideo.load();

            myMessage.innerText = req.message
            //show div
            mydiv.style.display = 'block';
            myVideo.onended = function(e) {
                /*its done! hide!*/
                mydiv.style.display = 'none';
            };
            //reset and play video
            myVideo.currentTime = 0;
            myVideo.play();
            console.log("ooohmygod!")
            console.log(req.message)
    }
};