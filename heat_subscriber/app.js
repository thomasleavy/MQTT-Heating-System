var mqtt = require('mqtt')

var PORT = 1883;

var options = {
  port: PORT,
  clean: true,
  clientId: "heat_subscriber"
}

var client = mqtt.connect(options)

let lastCommand = null;
client.on('connect', function () {
  client.subscribe('/office/heat', { qos: 1 }, function (err) {
      if (err) {
          console.error("Failed to subscribe:", err);
      } else {
          console.log("Subscribed to /office/heat");
      }
  });
});

client.on('message', function (topic, message, packet) {
  if (packet.retain) {
      console.log("Ignored retained message");
      return;
  }

  try {
      var data = JSON.parse(message.toString());
      if (data.command !== lastCommand) {
          console.log(data.message);
          lastCommand = data.command;
      }
  } catch (error) {
      console.error("Error parsing message:", error);
  }
});