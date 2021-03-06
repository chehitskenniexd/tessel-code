// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

/*********************************************
This servo module demo turns the servo around
1/10 of its full rotation  every 500ms, then
resets it after 10 turns, reading out position
to the console at each movement.
*********************************************/

var tessel = require('tessel');
var servolib = require('servo-pca9685');

var servo = servolib.use(tessel.port['A']);

var servo1 = 1; // We have a servo plugged in at position 1
var servo2 = 2;

servo.on('ready', function () {
  var position = 0;  //  Target position of the servo between 0 (min) and 1 (max).

  var servos = [1, 2];
  servos.forEach(current => {
    servo.configure(current, 0.05, 0.12, function () {
        setInterval(function () {
         console.log('Position (in range 0-1):', position);
         //  Set servo #1 to position pos.
         servo.move(current, position);

        // Increment by 10% (~18 deg for a normal servo)
        position += 0.1;
        if (position > 1) {
            position = 0; // Reset servo position
        }
        }, 500); // Every 500 milliseconds
    });
  });
});