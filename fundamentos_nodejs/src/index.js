const express = require('express')
const app = express()

app.use(express.json())

/** 
* GET - Buscar uma informação dentro do servidor
* POST - Inserir uma informação dentro do servidor
* PUT - Alterar uma informação dentro do servidor
* PATCH - Alterar uma informação especifica dentro do servidor
* DELETE - Deletar uma informação dentro do servidor
*/

/**
* Tipos de Parametros
*
* Route Params => Identificar um recurso para editar/deletar/buscar
* Query Paramas => Paginação / Filtro
* Body Params => Os Objetos inserção/alteração de um recurso
*/


app.get("/courses", (request, response) => {
    console.log(request.query)
    return response.json([
        "Curso 1",
        "Curso 2",
        "Curso 3"
    ])
})

app.post("/courses", (request, response) => {
    console.log(request.body)
    return response.json([
        "Curso 1",
        "Curso 2",
        "Curso 3",
        "Curso 4"
    ])
})

app.put("/courses/:id", (request, response) => {
    console.log(request.params.id)
    return response.json([
        "Curso 6",
        "Curso 2",
        "Curso 3",
        "Curso 4"
    ])
})

app.patch("/courses/:id", (request, response) => {
    return response.json([
        "Curso 5",
        "Curso 2",
        "Curso 3",
        "Curso 4"
    ])
})

app.delete("/courses/:id", (request, response) => {
    return response.json([
        "Curso 1",
        "Curso 2",
        "Curso 3"
    ])
})


// localhost:3031
app.listen(3333)