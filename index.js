const express = require('express');
const app = express();

const checkWorkingHours = (req, res, next) => {
    const date = new Date();
    const dayOfWeek = date.getDay();
    const hourOfDay = date.getHours();

    if (dayOfWeek >= 1 && dayOfWeek <= 5 && hourOfDay >= 9 && hourOfDay < 17) {
        next();
    } else {
        res.send('Sorry, our website is only available during working hours (Monday to Friday, 9am to 5pm).');
    }
};

app.use(checkWorkingHours);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/services', (req, res) => {
    res.sendFile(__dirname + '/services.html');
});

app.get('/contact', (req, res) => {
    res.sendFile(__dirname + '/contact.html');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.use(express.static('public'));
app.set('views', './views');
app.set('view engine', 'ejs');