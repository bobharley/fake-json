var express = require('express'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    faker = require('faker'),
    app = express()


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));

var router = express.Router();

router.get('/traffic', function(req, res) {
  let numItems = req.param('items') == undefined ? 5 : req.param('items')
  numItems = numItems > 1000 ? 1000 : numItems;
  let data = [];
  for(var i = 0; i<numItems; i++) {
    data[i] = {
      id: i,
      upload: faker.random.number(),
      download: faker.random.number(),
      url: faker.internet.url()
    }
    data[i].total = data[i].upload + data[i].download;
  }
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.send(JSON.stringify(data, null, 2));
});

app.use('/', router);

app.listen(9000);
console.log('Server listening on port 3000');
