const app = require('../app');

const client = require('../db/connectDB');

app.get('/api/users', function (req, res)
{  
    client.query(`SELECT * FROM users`, (Inerr, Inresult) => 
    {
        if (Inerr)
        {
            res.status(500).send("We Encoutered An Error Getting All Users");
        }

        if (Inresult)
        {
            res.status(200).json({
                "users" : Inresult.rows
            })
        }
    });
});


app.post('/api/users', function (req, res)
{    
    const realvalue = [req.body.name];

    client.query(`INSERT INTO users (name) VALUES ($1)`, realvalue, (Inerr, Inresult) => 
    {
        if (Inerr)
        {
            res.status(500).send("We Encoutered An Error Registering New Name");
            console.log(err);
        }

        if (Inresult)
        {
            res.status(201).send(`Name ${req.body.name} Registration Successful`);
        }

    });
});

app.patch('/api/users/:id', (req, res) =>
{
    const userId = req.params.id;
    
    if (!userId)
    {
        res.status(400).send('Please provide a User ID');
    }

    client.query(`SELECT * FROM users WHERE Id = '${userId}'`, (err, result) => 
    {
        if (err)
        {
            res.status(500).send("We Encoutered An Error Getting User");
        }

        if (result.rows[0])
        {
            const newName = req.body.name;

            client.query(`UPDATE users SET name ='${newName}' WHERE Id ='${userId}'`, (UpErr, UpRes) =>
            {
                if (UpErr)
                {
                    res.status(400).send("Error updating Name");
                }

                if (UpRes)
                {
                    res.status(201).send("Name Successfully Updated");
                }
            });
        }

        if (!result.rows[0])
        {
            res.status(400).send("User with such ID does not exist")
        }

    });
});


app.delete('/api/users/:id', (req, res) =>
{
    const userId = req.params.id;
    
    if (!userId)
    {
        res.status(400).send('Please provide a User ID');
    }

    client.query(`SELECT * FROM users WHERE Id = '${userId}'`, (err, result) => 
    {
        if (err)
        {
            res.status(400).send("We Encoutered An Error Getting User");
            console.log(err);
        }

        if (result.rows[0])
        {
            client.query(`DELETE FROM users WHERE Id ='${userId}'`, (DelErr, DelRes) =>
            {
                if (DelErr)
                {
                    res.status(500).send('We Encountered An Issue Deleting This User');
                }

                if (DelRes)
                {
                    res.status(200).send("User Deleted Successfully");
                }
            });
        }

        if (!result.rows[0])
        {
            res.status(400).send("User with such ID does not exist")
        }
    });
});


app.get('/api/users/:id', (req, res) =>
{
    const userId = req.params.id;

    client.query(`SELECT * FROM users WHERE Id = '${userId}'`, (err, result) => 
    {
        if (err)
        {
            res.status(500).send("We Encoutered An Error Getting User");
        }

        if (result.rows[0])
        {
            client.query(`SELECT * FROM user_tasks WHERE user_id = '${userId}'`, (Uerr, Uresult) => 
            {
                if (Uerr)
                {
                    res.status(500).send("We Encoutered An Error While Getting Todos By This User");
                }

                if (!Uresult.rows[0])
                {
                    res.status(200).send("User Has No Todo Yet");
                }

                if (Uresult.rows[0])
                {
                    res.status(200).json({
                        "ID": result.rows[0].id,
                        "Name": result.rows[0].name,
                        "todos" : Uresult.rows
                    });
                }
            });
        }

        if (!result.rows[0])
        {
            res.status(400).send("User with such ID does not exist")
        }
    });
});

app.get('/api/user/:id', (req, res) =>
{
    const userId = req.params.id;

    client.query(`SELECT * FROM users WHERE Id = '${userId}'`, (err, result) => 
    {
        if (err)
        {
            res.status(500).send("We Encoutered An Error Getting User");
        }

        if (result.rows[0])
        {
            res.status(200).json({
                "ID": result.rows[0].Id,
                "Name": result.rows[0].name
            });
        }

        if (!result.rows[0])
        {
            res.status(400).send("User with such ID does not exist")
        }
    });
});

const userRoute = app;

module.exports = userRoute;
