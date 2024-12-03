var mqtt = require('mqtt');

var options = {
    port: 1883,
    clean: true,
    clientId: "clear_retained"
};

var client = mqtt.connect(options);

client.on('connect', function () {
    client.publish('/office/heat', '', { qos: 1, retain: true }, function () {
        console.log("Cleared retained message");
        client.end();
    });
});
