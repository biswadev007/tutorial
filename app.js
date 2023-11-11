const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 4001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let data = [];
app.get('/', (req, res) => {
  return res.send('Hello...');
});
/**------------------------------------------------------------------- */

app.post('/push-data', (req, res) => {
  data.push(req.body);
  return res.status(201).send({ msg: 'Data store', data: req.body });
});

app.get('/fetch-data', (req, res) => {
  return res.status(200).send({ data });
});

app.get('/fetch-data/:id', (req, res) => {
  let { id } = req.params;
  const filterData = data.filter((el) => el.id === parseInt(id));
  return res.status(200).send({ data: filterData });
});

app.patch('/update-data/:id', (req, res) => {
  let { id } = req.params;
  data = data.map((el) => {
    if (el.id === parseInt(id)) {
      return {
        id: parseInt(id),
        ...req.body, // Spread operator
      };
    }
    return el;
  });

  return res.status(200).send({ data: { id: parseInt(id), ...req.body } });
});

app.delete('/delete-data/:id', (req, res)=> {
  let { id } = req.params;
  data = data.filter(el => el.id !== parseInt(id));

  return res.status(200).send({ msg: 'Data deleated' });
});

app.delete('/delete-data', (req, res)=> {
  data = [];
  return res.status(200).send({ msg: 'Data deleated' });
});

/**------------------------------------------------------------------- */

app.listen(PORT, () => console.log(`Server running at PORT: ${PORT}`));
