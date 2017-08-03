import express from 'express';
import mongodb from 'mongodb';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
const dbUrl = 'mongodb://localhost/crudwithredux';

function validate(data) {
  let errors = {};
  if (data.fname === '') errors.fname = "Can't be empty";
  if (data.lname === '') errors.lname = "Can't be empty";
  if (data.dt === '') errors.dt = "Can't be empty";
  if (data.company === '') errors.company = "Can't be empty";
  if (data.email === '') errors.email = "Can't be empty";
  if (data.phone === '') errors.phone = "Can't be empty";
  if (data.cover === '') errors.cover = "Can't be empty";
  const isValid = Object.keys(errors).length === 0
  return { errors, isValid };
}

mongodb.MongoClient.connect(dbUrl, function(err, db) {

  console.log('Mongodb started...')
  
  app.get('/api/contacts', (req, res) => {
    db.collection('contacts').find({}).toArray((err, contacts) => {
      console.log('contacts: '+contacts);
      res.json({ contacts });
    });
  });

  app.post('/api/contacts', (req, res) => {
    const { errors, isValid } = validate(req.body);
    if (isValid) {
      const { fname, lname, dt, company, email, phone, cover } = req.body;
      db.collection('contacts').insert({ fname, lname, dt, company, email, phone, cover }, (err, result) => {
        if (err) {
          res.status(500).json({ errors: { global: "Something went wrong" }});
        } else {
          res.json({ contact: result.ops[0] });
        }
      });
    } else {
      res.status(400).json({ errors });
    }
  });

  app.put('/api/contacts/:_id', (req, res) => {
    const { errors, isValid } = validate(req.body);

    if (isValid) {
      const { fname, lname, dt, company, email, phone, cover } = req.body;
      db.collection('contacts').findOneAndUpdate(
        { _id: new mongodb.ObjectId(req.params._id) },
        { $set: { fname, lname, dt, company, email, phone, cover } },
        { returnOriginal: false },
        (err, result) => {
          if (err) { res.status(500).json({ errors: { global: err }}); return; }

          res.json({ contact: result.value });
        }
      );
    } else {
      res.status(400).json({ errors });
    }
  });

  app.get('/api/contacts/:_id', (req, res) => {
    db.collection('contacts').findOne({ _id: new mongodb.ObjectId(req.params._id) }, (err, contact) => {
      res.json({ contact });
    })
  });

  app.delete('/api/contacts/:_id', (req, res) => {
    db.collection('contacts').deleteOne({ _id: new mongodb.ObjectId(req.params._id) }, (err, r) => {
      if (err) { res.status(500).json({ errors: { global: err }}); return; }

      res.json({});
    })
  });

  app.use((req, res) => {
    res.status(404).json({
      errors: {
        global: "Still working on it. Please try again later when we implement it"
      }
    });
  })

  app.listen(8080, () => console.log('Server is running on localhost:8080'));

});
