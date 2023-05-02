// Importăm pachetele necesare
import express from 'express'; // Express.js pentru a crea serverul web
import mongoose from 'mongoose'; // Mongoose pentru a lucra cu MongoDB
import cors from 'cors'; // CORS (Cross-Origin Resource Sharing) pentru a permite comunicarea între frontend și backend
import dotenv from 'dotenv'; // Dotenv pentru a încărca variabilele de mediu din fișierul .env

// Încărcăm variabilele de mediu
dotenv.config();

// Conectăm serverul la baza de date MongoDB
mongoose
  .connect(process.env.MONGODB_URI) // Se conectează la MongoDB folosind URI-ul din variabilele de mediu din fisierul .env
  .then(() => console.log('db ok')) // Dacă conexiunea a reușit, afișăm în consolă mesajul "db ok"
  .catch((err) => console.log('db error', err)); // Dacă apare o eroare, afișăm în consolă mesajul "db error" și detalii despre eroare

// Creăm o instanță Express
const app = express();

// Adăugăm middleware-uri
app.use(cors()); // Adăugăm middleware-ul CORS pentru a permite comunicarea între frontend și backend
app.use(express.json()); // Adăugăm middleware-ul pentru a putea procesa cereri JSON

// Definim rutele pentru evenimente, utilizatori și grupuri
app.use('/api/events', require('./routes/events').default); // Ruta pentru evenimente
app.use('/api/users', require('./routes/users').default); // Ruta pentru utilizatori
app.use('/api/groups', require('./routes/groups').default); // Ruta pentru grupuri

// Definim ruta principală
app.get('/', (req, res) => {
  res.send('Hello'); // Răspundem cu "Hello" pentru solicitările la ruta principală
});

// Pornim serverul
const PORT = process.env.PORT || 4445; // Folosim PORT-ul din variabilele de mediu sau, în lipsa acestuia, portul 4445
app.listen(PORT, (err) => { // Pornim serverul pe PORT-ul specificat
  if (err) {
    return console.log(err); // Dacă apare o eroare, afișăm în consolă detalii despre eroare
  }
  console.log(`Server running on port ${PORT}`); // Dacă serverul a pornit cu succes, afișăm în consolă mesajul "Server running on port {PORT}"
});
