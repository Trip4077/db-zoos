const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile');

const server = express();
const db = knex(knexConfig.development);

server.use(express.json());
server.use(helmet());

// endpoints here
//Add Zoo
server.post('/api/zoos', (req, res) => {
  const zoo = req.body;

  db.insert(zoo)
    .into('zoos')
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json(err);
    });
}) 

//Get zoos
server.get('/api/zoos', (req, res) => {
   db('zoos')
      .then(zoos => {
        res.json(zoos);
      }).catch(err => {
        res.status(500).json(err)
      })
})

//Get zoo by ID
server.get('/api/zoos/:id', (req, res) => {
  db('zoos')
      .where({ id: req.params.id })
      .then(zoo => {
        res.json(zoo);
      })
      .catch(err => {
        res.json(err)
      });
});

//Edit zoo by ID
server.put('/api/zoos/:id', (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  db('zoos')
    .where({ id })
    .update(changes)
    .then(zoo => {
    })
    .catch(err => {
      res.status(500).json(err)
    });
});

//Delete zoo
server.delete('/api/zoos/:id', (req, res) => {
  const { id } = req.params;

  db('zoos')
    .where({ id })
    .del()
    .then(zoo => {
      res.status(200).json(zoo)
    }).catch(err => {
      res.status(500).json(err)
    });
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
