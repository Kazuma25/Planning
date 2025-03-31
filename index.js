const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const db = require('./models');
const app = express();
const PORT = process.env.PORT || 7000;
const { authenticateToken } = require('./middleware/auth.middleware');
app.use(bodyParser.json());
db.sequelize.sync().then(() => {
console.log('Database connected');
});

// Define routes User
const adresseRoutes = require('./routes/userRoute.js');
app.use('/user', authenticateToken, adresseRoutes);


// Define routes Equipe
const equipeRoutes = require('./routes/Equipe');
app.use('/equipes', equipeRoutes);

// Define routes Planning
const planningRoutes = require('./routes/Planning');
app.use('/plannings', planningRoutes);

// Define routes Appartenir
const appartenirRoutes = require('./routes/Appartenir');
app.use('/appartenances', appartenirRoutes);


// Define routes Evenement
const evenementRoutes = require('./routes/Evenement');
app.use('/evenements', evenementRoutes);


// Define routes Auth
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});
