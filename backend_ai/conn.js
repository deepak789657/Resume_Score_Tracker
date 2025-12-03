const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://deepakkumar887753_db_user:lRijdkdY7MXvEWrw@cluster0.dnqfinn.mongodb.net/mproject?retryWrites=true&w=majority')
.then(() => {
    console.log("Connected to MongoDB");
})
.catch(err => {
    console.log("Error connecting to MongoDB", err);
});










// lRijdkdY7MXvEWrw    

// deepakkumar887753_db_user

// mongodb+srv://deepakkumar887753_db_user:lRijdkdY7MXvEWrw@cluster0.dnqfinn.mongodb.net/?appName=Cluster0

// cohere key 
// dkNagCBw6vyfE3yVijJMKb5R5z4NUPXq6oeJhlsA   