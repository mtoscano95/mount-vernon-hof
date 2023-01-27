
/* boiler plate for starting a server
const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})

*/


/* building pipeline, waiting for requests 

const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

adding the get in. What comes back to the client is not the server.js file its just the HTML
Static files might have images, stylesheets. We want to make a folder named public and put a styelsheet in there

app.get('/', (req, res)=>{
    res.send(
   `     <html>
        <head>
        </head>
        <body>
            <h1>Mount Vernon Hall of Fame</h1>
        </body>
        </html>`
    )
})

app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})

*/

/*
//express allows us to configure application now that we have set up our HTML and added our stylesheet

const express = require('express');

const app = express();

// we're going to use app.use and use express.static to look into the public folder. We'll also add the styls eheet via a link
// express.static helps us point to folder when a request comes in and looks in that folder
app.use(express.static('public'))

//if we just run the app.use below it'll run forever. But if we go into the browswer and put in/styles.css -> itll show the styles.css code since thats above in the public section and its a waterfall

app.use(()=>{});

const port = process.env.PORT || 3000;

app.get('/', (req, res)=>{
    res.send(
   `    <html>
        <head>
            <link rel="stylesheet" href = "styles.css"/>
        </head>
        <body>
            <h1>Mount Vernon Hall of Fame</h1>
        </body>
        </html>`
    )
})

app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})

*/

/*

// we'll make our middleware function log the request method and request URL. We need next so that it stops and doesnt keep doing

const express = require('express');

const app = express();

app.use(express.static('public'))

// using the 

app.use(((req, res, next)=>{
    console.log(`${req.method} - ${req.url}`);
    next();
}));

const port = process.env.PORT || 3000;

app.get('/', (req, res)=>{
    res.send(
   `    <html>
        <head>
            <link rel="stylesheet" href = "styles.css"/>
        </head>
        <body>
            <h1>Mount Vernon Hall of Fame</h1>
        </body>
        </html>`
    )
})

app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})

*/


const express = require('express');
const app = express();

// eventually data will come from database rn its coming from here, a JS file.
const people = [
    {
        id: 1,
        name: 'Heavy D',
        bio: 'BIO for Heavy D'
    },
    {
        id: 2,
        name: 'Pete Rock',
        bio: 'BIO for Pete Rock'
    },
    {
        id: 3,
        name: 'DMX',
        bio: 'BIO for DMX'
    },
    {
        id: 4,
        name: 'Susan',
        bio: 'BIO for Susan'
    }
]

app.use(((req, res, next)=>{
    console.log(`${req.method} - ${req.url}`);
    next();
}));

const port = process.env.PORT || 3000;

// below we basically add an unordered list and allow there to be a href functionality

app.get('/', (req, res)=>{
    res.send(
   `    <html>
        <head>
            <title> Mount Vernon Hall of Fame </title>
            <link rel="stylesheet" href = "styles.css"/>
        </head>
        <body>
            <h1>Mount Vernon Hall of Fame</h1>
            <ul>
            ${
                people.map(person => {
                return `<li>
                <a href='/people/${person.id}'>${person.name}
                </a></li>`;
            }).join('')

            }
            </ul>
        </body>
        </html>`
    )
})


// here were going to set up our route. once the route gets hit we have a req and a resp
app.get('/people/:id', (req,res)=>{
    // we want to find the person with this ID
    // first we have an array of people, so we want to use "find" we want to find the person 
    const person = people.find( person => person.id === req.params.id*1);
    // then I want to make the site show us the person.name and person.bio we would need
    res.send(
        `
        <html>
        <head>
            <title> Mount Vernon Hall of Fame </title>
            <link rel="stylesheet" href = "styles.css"/>
        </head>
        <body>
            <h1>Mount Vernon Hall of Fame</h1>
            <h2> ${person.name}</h2>
            <a href='/'>Back to All</a>
            <p>${person.bio}</p>
        </body>
        </html>

        `
    )
})

app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})