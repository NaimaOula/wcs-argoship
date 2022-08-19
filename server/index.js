  const express = require('express');
  const bodyParser = require('body-parser');
  const cors = require('cors');
  const app = express();
  const mysql = require('mysql');

  const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    port: '8889',
    password: 'root',
    database: 'wcs-argoship',
  });

  app.use(cors()); // for cors policy issues
  app.use(express.json()); // apply this middleware when you request something from the front end (here an object while we want a json on the back end)
  app.use(bodyParser.urlencoded({extended: true}));
 
  app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT * FROM `wcs-argoship`.member LIMIT 50;"
    db.query(sqlSelect, (err, result) => {
      res.send(result);
    }); 
  });

  app.post('/api/insert', (req, res) => {
    const argoName = req.body.argoName;
    const sqlIdAuto = "ALTER TABLE `wcs-argoship`.member MODIFY id int NOT NULL AUTO_INCREMENT;"
    const sqlInsert = (sqlIdAuto, "INSERT INTO `wcs-argoship`.member (argoName) VALUES (?);")
    db.query(sqlInsert, [argoName], (err, result) => {
      // console.log(err);
      res.send('Welcome on board !');
    });
  });

  app.listen(3001, () => {
    console.log('running on port 3001');
  });
