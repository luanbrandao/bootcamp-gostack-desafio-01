const express = require('express');

const server = express();

server.use(express.json());


let _id = 0;
const contador = () => ++_id;

projects = [];


//Middlewares Global
server.use( (req ,res , next) => {

    console.log("requisições => " , contador())
    
    next();
} )

function checkProjectExist(req ,res , next){
    const {id} = req.params;     
    const user = projects.find( obj => {
        obj.id == id 
        return obj
    });

    if( !user ) {
        return res.status(400).json({ error: 'Project does not exists'})
    }
    console.log('user => ' , user);
    return next()
}

function Project( id, title) {
    this.id = id;
    this.title = title;
    this.tasks = [];
}

server.get('/projects' , (req , res) => {
    return res.json(projects)
});

server.get('/projects/:id' , checkProjectExist, (req , res) => {
    const {id} = req.params;     
    return res.json(projects.find( obj => obj.id == id ))
});

server.post('/projects' , (req , res) => {
    const {id} = req.body; 
    const {title} = req.body; 
    project = new Project( id ,title )
    projects.push( project)

    return res.json(projects)
});


server.put('/projects/:id' ,checkProjectExist, (req , res) => {
    const {id} = req.params;     
    const {title} = req.body; 
    projects.find( obj => {
        if (obj.id == id)   obj.title = title        
    } )

    return res.json(projects)
})

// incompleto
server.delete('/projects/:id' ,checkProjectExist, (req , res) => {
    const {id} = req.params;     
    
    const indice = projects.findIndex(function(obj){
        return obj.id == id;
    });

    if (indice != -1 ) projects.splice(indice, 1)
    
    return res.send();
})



// tasks
server.post('/projects/:id/tasks',checkProjectExist , (req , res) => {
    const {id} = req.params; 
    const {title} = req.body;    
    projects.find( obj => {
        if (obj.id == id)   obj.tasks.push(title)
        return res.json(obj)
    } )

    
})

server.listen(3000);