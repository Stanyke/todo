const app = require('../app');

const client = require('../db/connectDB');

app.post('/api/todos', (req, res) =>
{

    const realvalues = [req.body.description, req.body.state, req.body.user_id];

    client.query(`SELECT * FROM users WHERE Id = '${req.body.user_id}'`, (err, result) => 
    {
        if (err)
        {
            res.status(500).send("We Encoutered An Error Verifying User");
        }

        if (!result.rows[0])
        {
            res.status(400).send("User with such ID does not exist")
        }

        if (result.rows[0])
        {
            client.query(`INSERT INTO user_tasks (description, state, user_id) VALUES ($1, $2, $3)`, realvalues, (Err, Res) =>
            {
                if (Err)
                {
                    res.status(500).send("We Encoutered An Error Creating Todo");
                }

                if (Res)
                {
                    res.status(201).send("Task successfully Created");
                }
            });
        }
    });
});

app.get('/api/todos/:id', (req, res) =>
{

    const taskId = req.params.id;
    
    if (!taskId)
    {
        res.status(400).send('Please provide a Task ID');
    }

    client.query(`SELECT * FROM user_tasks WHERE Id = '${taskId}'`, (Uerr, Uresult) => 
    {
        if (Uerr)
        {
            res.status(500).send("We Encoutered An Error Getting User's Todo");
        }

        if (!Uresult.rows[0])
        {
            res.status(400).send("User's Todo with such ID does not exist")
        }

        if (Uresult.rows[0])
        {
            res.status(200).json({
                "ID": Uresult.rows[0].Id,
                "Description": Uresult.rows[0].description,
                "State": Uresult.rows[0].state,
                "User_id": Uresult.rows[0].user_id
            });

        }

    });
});


app.patch('/api/todos/:id', (req, res) =>
{
    const taskId = req.params.id;
    
    if (!taskId)
    {
        res.status(400).send('Please provide a Task ID');
    }

    client.query(`SELECT * FROM users WHERE Id = '${req.body.user_id}'`, (Uerr, Uresult) => 
    {
        if (Uerr)
        {
            res.status(500).send("We Encoutered An Error Verifying User");
        }

        if (!Uresult.rows[0])
        {
            res.status(400).send("User with such ID does not exist")
        }

        if (Uresult.rows[0])
        {
            client.query(`SELECT * FROM user_tasks WHERE Id = '${taskId}'`, (Cerr, Cresult) => 
            {
                if (Cerr)
                {
                    res.status(500).send("We Encoutered An Error Verifying Task");
                }

                if (!Cresult.rows[0])
                {
                    res.status(400).send("Task with such ID does not exist")
                }

                if (Cresult.rows[0])
                {
                    client.query(`SELECT * FROM user_tasks WHERE user_id = '${req.body.user_id}'`, (err, result) => 
                    {
                        if (err)
                        {
                            res.status(500).send("We Encoutered An Error Verifying If User Owns This Todo");
                        }

                        if (!result.rows[0])
                        {
                            res.status(400).send("User Does Not Own This Todo")
                        }

                        if (result.rows[0])
                        {
                            const description = req.body.description;
                            const taskState = req.body.state;
                            const user_id = req.body.user_id;

                            client.query(`UPDATE user_tasks SET description ='${description}', state = '${taskState}', user_id = '${user_id}' WHERE Id ='${taskId}'`, (UpErr, UpRes) =>
                            {
                                if (UpErr)
                                {
                                    res.status(400).send("Error updating Task");
                                }

                                if (UpRes)
                                {
                                    res.status(201).send("Task Successfully Updated");
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});

const todoRoute = app;

module.exports = todoRoute;