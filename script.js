console.log('Hello World!');

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
            console.log("ooohmygod!")
            console.log(req.message)
    }
};