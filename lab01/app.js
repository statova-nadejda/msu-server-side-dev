console.log('Node.js is working!');

const http = require('http');
const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url} | ${currentTime}`);

    if (req.method === 'GET' && req.url === '/') {
    res.end('Home page');
    }
    else if (req.method === 'GET' && req.url === '/time'){
    res.end(currentTime);
    }

    else if (req.method === 'GET' && req.url === '/about') {
        res.end('About page');
    }

    else if(req.method === 'GET' && req.url === '/student'){
        res.end(`Name ${student.name}, Surname ${student.surname}, Group ${student.group}`);
    }

    else if (req.method === 'GET' && req.url === '/api/student') {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(student));
    }

    else if(req.method === 'GET' && req.url === '/api/courses'){
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(disciplines));
    }

    else if(req.method === 'GET' && req.url === '/predictions'){
        const randomNumber = Math.floor(Math.random() * predictions.length)
        res.end(predictions[randomNumber]);
    }

    else {
        return res.status(404).json({message:'404 - Page not found'});
    }

    //res.end('Hello from Node.js server!');
});

server.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});

const student = {
        name: 'Nadejda',
        surname: 'Statova',
        group: 'IA2404',
        speciality: 'Applied Informatics'
    };

const disciplines = [{
    name: 'Mathematics',
    teacher: 'Ion Popescu',
    credits: 180
},
{
    name: 'Chemistry',
    teacher: 'Maria Rusu',
    credits: 200
},
{
    name: 'English',
    teacher: 'Radu Ionescu',
    credits: 240
}];

const currentTime = new Date().toLocaleString('ru-Ru', {
    timeZone: 'Europe/Chisinau'
});

const predictions = [
    "Today you will open the fridge, forget why, and close it again.",
    "A mysterious bug will disappear the moment you try to show it to someone.",
    "You will say 'just five more minutes' and accidentally lose half an hour.",
    "Someone will message you exactly when you decide to focus.",
    "You will find money in a pocket you completely forgot about.",
    "Your coffee will become cold before you remember to drink it.",
    "Today you will make one decision that Future You will either love or question deeply."
]; 