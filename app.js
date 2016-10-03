var tessel = require('tessel');

var servo = require('servo-pca9685').use(tessel.port['A']);
var accel = require('accel-mma84').use(tessel.port['B']);

// Ideal: X-Axis : -1.00, Z-Axis: 0.00
var servos = [1, 2];
    // Initialize the accelerometer.
accel.on('ready', function () {
    console.log('accel ready');
    //servo.on('ready', function() {
        console.log('servo ready');
        // Stream accelerometer data
        accel.setOutputRate(0.5,() => {
            accel.on('data', function (xyz) {
                var x_axis = xyz[0].toFixed(2);
                var z_axis = xyz[2].toFixed(2);
                console.log(x_axis, z_axis);
                if(z_axis < 0.05){
                    servo.move(1, -0.15);
                    servo.move(2, -0.15);
                } else if (z_axis > 0.05) {
                    servo.move(1, 0.15);
                    servo.move(2, 0.15);         
                }
            });
        });
    //});
});
