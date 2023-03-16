
// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');


// const app = express();

// app.use(bodyParser.json());

// const productSchema = new mongoose.Schema({
//   name: String,
//   category: String,
//   price: Number,
// });

// const Product = mongoose.model('Product', productSchema);

// app.post('/products', async (req, res) => {
//   try {
//     const product = new Product(req.body);
//     await product.save();
//     res.status(201).send(product);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

// app.get('/products', async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.send(products);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// app.put('/products/:id', async (req, res) => {
//   try {
//     const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.send(product);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

// app.delete('/products/:id', async (req, res) => {
//   try {
//     const product = await Product.findByIdAndDelete(req.params.id);
//     res.send(product);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

// mongoose.connect('mongodb://localhost/sellers', { useNewUrlParser: true, useUnifiedTopology: true });

// app.listen(3000, () => {
//   console.log('Server listening on port 3000');
// });



const myForm = document.querySelector('#orders-form');
const dishName = document.querySelector('#name');
const dishAmount = document.querySelector('#amount');
const table = document.querySelector('#table');
const msg = document.querySelector('.msg');

myForm.addEventListener('submit', onSubmit);

window.addEventListener('DOMContentLoaded', () => {
    axios.get('https://crudcrud.com/api/5c833be1318941c1a9929e98234830a8/newRequest')
    .then((response) => {
        for(orderObj of response.data){
            showOrdersOnScreen(orderObj);
        }
    })
    .catch(err => {
        myForm.innerHTML = '<h1>Error: Something went wrong!!!!</h1>';
        console.log(err);
    })
})

function onSubmit(e){
    e.preventDefault();
    if(dishName.value === '' || dishAmount.value === ''){
        msg.classList.add('error');
        msg.innerHTML = 'Please enter all fields';

        setTimeout(() => msg.remove(), 3000);
    }
    else{
        let dishObj = {
            name : dishName.value,
            amount : dishAmount.value,
            table: table.value
        }
        axios.post('https://crudcrud.com/api/5c833be1318941c1a9929e98234830a8/newRequest', dishObj)
        .then((response) => {
            console.log(response)
            showOrdersOnScreen(response.data);
        })
        .catch(err => {
            document.body.innerHTML += 'Error: Something went wrong!!!!';
            console.log(err)
        });

        dishName.value = '';
        dishAmount.value = '';
    }
}

function showOrdersOnScreen(obj){
    var tableNo = document.getElementById(obj.table);
    const li = document.createElement('li');
    var orderDetails = document.createTextNode(`${obj.name} : ${obj.amount} : ${obj.table}`);
    li.appendChild(orderDetails);
    li.classList = 'tableOrders';

    // create delete btn element
    var delBtn = document.createElement('button');
    delBtn.className = 'delete';
    var delText = document.createTextNode('Delete');
    delBtn.appendChild(delText);
  
    // delete event
    delBtn.onclick = () =>{
        if(confirm('Are you sure ?')){
            tableNo.removeChild(li);
            axios.delete('https://crudcrud.com/api/5c833be1318941c1a9929e98234830a8/newRequest'+obj._id);
        }
    }   

    li.appendChild(delBtn);
    tableNo.appendChild(li);
}


