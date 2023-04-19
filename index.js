import express from 'express'; //generare web server
import mongoose from 'mongoose'; //legatura cu mongodb

//cream legatura cu mongodb
mongoose
.connect('mongodb+srv://ana:gorihonamu85@cluster0.yivkgdq.mongodb.net/test', //linkul pt baza de date
).then(() => console.log('db ok')) //mesaj care este afisat in consola(terminal), daca a reusit legatura cu bd, apare dupa ce merge randul 22 
.catch((err)=>console.log('db error', err));

const app = express();
app.use(express.json());

//ce este afisat in localhost
app.get('/', (req, res) => {
    res.send('Hello');
});

//portul care l-am folosit   ---localhost:4444
app.listen(4445, (err) => {
   if(err){
    return console.log(err);
   }
   console.log("ok");
})