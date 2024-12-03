var mqtt = require('mqtt')
var readLineSync = require('readline-sync')

var options = {
    port: 1883,
    clean: true,
    clientId: "heat_publisher",
    keepalive: 60
  }

var client  = mqtt.connect(options)

var action = parseInt(
  readLineSync.question(
    "What would you like to do?\n"
    + "\t 1 Turn heating on\n"
    + "\t 2 Turn heating off\n"
  )
)

var message
var command
if(action === 1) {
  message = "Turning heating on"
  command = "ON"
} else if(action === 2) {
  message = "Turning heating off"
  command = "OFF"
} else {
  console.log("Error action not recognised")
  process.exit()
}

client.on('connect', function() {
  var data = JSON.stringify({
    message: message,
    command: command
  })
  client.publish('/office/heat', data, { qos: 1, retain: false }, function () {
    console.log("Message sent:", message);
    client.end();
});

});