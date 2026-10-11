import express from "express"
import restaurantController from './restaurantController.js'

const PORT = process.env.PORT || 3000
const app = express()


app.use(express.json());


// var a = ['/api/ahsfacility', '/api/ahsinspection', '/api/ahsviolation']

app.use('/api', restaurantController);


console.log('Listening on port 3000')
app.listen(3000)




