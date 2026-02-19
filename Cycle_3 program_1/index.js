const EventEmitter = require('events');
const customEmitter = new EventEmitter();

// Simulate async process function
function simulateAsyncProcess(message) {
    return new Promise((resolve) => {
        console.log(message);
        setTimeout(resolve, 1000);
    });
}

// Async listener for userLogin
customEmitter.on('userLogin', async (username) => {
    console.log(`User "${username}" is logging in...`);

    // Simulate a delay with async/await
    await simulateAsyncProcess('Checking user credentials...');
    
    console.log(`User "${username}" successfully logged in!`);
});

// Another async listener for sensor readings
customEmitter.on('sensorReading', async (sensorType, value) => {
    console.log(`Received a reading from ${sensorType}: ${value}`);

    // Simulate an async processing step
    await simulateAsyncProcess(`Processing ${sensorType} data...`);

    if (sensorType === 'temperature' && value > 30) {
        console.log(`Warning: Temperature is too high!`);
    } else {
        console.log(`Sensor data processed successfully.`);
    }
});
async function simulateAsyncProcess(message) {
return new Promise((resolve) => {
setTimeout(() => {
console.log(message);
resolve();
}, 2000); // Simulate a delay of 2 seconds
});
}
// Simulate a user logging
setTimeout(() => {
customEmitter.emit('userLogin', 'john_doe');
}, 1000);
// Simulate a temperature sensor reading
setTimeout(() => {
customEmitter.emit('sensorReading', 'temperature', 35);
}, 3000);
// Simulate a humidity sensor reading
setTimeout(() => {
customEmitter.emit('sensorReading', 'humidity', 50);
}, 5000);
