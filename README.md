# miniApiRest-m3


Just an API for exercises purposes, it does a successful CRUD. It was good to learn how to deploy Node applications in Heroku

## Tools
- Express
- Node.js
- TypeScript

## Heroku Deploy

https://miniapirest.herokuapp.com/

## MINIAPI Documentation

 - GET "/" => Returns all tasks inserted
 - GET "/search?title=TITLE&content=CONTENT " => Returns all tasks matching queries
 - POST "/" => Receives a task in the model {title: string, content: string}
 - PUT "/edit/id" => Receives a task model {title: string, content: string}
 - PUT "/complete/:id" => Completes a task
 - DELETE "/delete/:id" => Deletes desired task
 
 
