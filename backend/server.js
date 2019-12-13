const app = require('./app');

const client = require('./db/connectDB');

const userRoute = require('./routes/user');

const todoRoute = require('./routes/todo');

const port = process.env.PORT || 3000;

app.listen(port, () =>
{
    console.log(`Server Running On port ${port}`);
});