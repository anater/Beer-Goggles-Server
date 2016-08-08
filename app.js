var express = require('express'),
    request = require('request'),
    bodyParser = require('body-parser'),
    app = express();

app.use(bodyParser.json());
app.set('port', 3000);

app.get('/', function(req, res, next){
    var userInput = processData(req),
        key = 'f2f26c4abe60a3a41cf5c9ee27d9da60',
        query = userInput.params[0].value,
        url = 'https://api.brewerydb.com/v2/search?key=' + key + '&q=' + query + '&type=beer&withBreweries=Y';

    request(url, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(body);
            res.send(body);
        }
    });
});

app.listen(app.get('port'), function(){
    console.log('Express started on port ' + app.get('port') + '; press Ctrl-C to terminate.');
})

function processData(req){
    var context = {
            method: req.method,
            params: []
        };

    for(var p in req.query){
        context.params.push({
            'name': p,
            'value': req.query[p]
        });
    }

    return context;
}

function setHeaders(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', 'http://andrewnater.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', false);
    next();
}
