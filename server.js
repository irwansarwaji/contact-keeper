const express = require('express');

const app = express();

//add a route
app.get('/', (req, res) => res.json({msg: 'welcome to the contact keeper API.'}));

//define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

// in development use port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));