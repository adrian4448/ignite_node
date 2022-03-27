const { response, request } = require('express')
const express = require('express')
const app = express()
const { v4: uuidv4 } = require('uuid')

app.use(express.json())

/** 
 * cpf - string
 * name - string
 * id - uuid
 * statement [] 
*/

const customers = []

// Middleware
function verifyCustomerExistByCpf(req, res, next) {
    const { cpf } = req.headers

    const customer = customers.find(customer => customer.cpf === cpf)

    if(!customer) {
        res.status(400).json({ error: 'Dont have client with this cpf' })
    }

    req.customer = customer

    return next()
}

function getBalance(statement) {
    const balance = statement.reduce((acc, operation) => {
        if(operation.type === 'credit') {
            return acc + operation.amount
        }else {
            return acc - operation.amount
        }
    }, 0)

    return balance
}

app.post('/account', (req, res) => {
    const { cpf, name } = req.body
    
    const customerAlreadyExist = customers.some(customer => customer.cpf === cpf)

    if(customerAlreadyExist) {
        return res.status(400).json({ error: 'Customer already exists' })
    }

    customers.push({ cpf,
        name, 
        id: uuidv4(), 
        statement: [] 
    })

    res.status(201).send()
})

app.get('/account', verifyCustomerExistByCpf, (req, res) => {
    const { customer } = req
    return res.send(customer)
})

app.put('/account', verifyCustomerExistByCpf, (req, res) => {
    const { name } = request.body
    const { customer } = request;

    customer.name = name

    return response.status(201).send()
})

app.delete('/account', verifyCustomerExistByCpf, (req, res) => {
    const { customer } = request;

    customers.splice(customer, 1)

    return response.status(201).send()
})

app.get('/statement', verifyCustomerExistByCpf, (req, res) => {
    const { customer } = req
    res.json(customer.statement)
})

app.post('/deposit', verifyCustomerExistByCpf, (req, res) => {
    const { customer } = req
    const { description,  ammount } = req.body

    customer.statement.push({ description, ammount, createdAt: new Date(), type: 'credit' })
    res.status(201).send()
})

app.post('/withdraw', verifyCustomerExistByCpf, (req, res) => {
    const { customer } = req
    const { ammount } = req.body

    const balance = getBalance(customer.statement)
    if(balance < amount) {
        return res.status(400).json({ error: 'Insufficient funds '})
    }

    customer.statement.push({ description, ammount, createdAt: new Date(), type: 'debit' })

    return res.status(201).send()
})

app.get('/statement/date', verifyCustomerExistByCpf, (req, res) => {
    const { customer } = req
    const { date } = req.query

    const dateFormat = new Date(date + " 00:00")

    const statement = customer.statement.filter(customer => 
        customer.createdAt.toDateString() === new Date(dateFormat).toDateString())

    res.json(statement)
})

app.get('/balance', verifyCustomerExistByCpf, (req, res) => {
    const { customer } = req

    const balance = getBalance(customer.statement)

    res.json(balance)
})

app.listen(3333)