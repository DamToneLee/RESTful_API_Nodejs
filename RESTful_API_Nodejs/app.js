import bodyparser from 'body-parser';
import express from 'express';
import conf from './conf.js';
import todo from './routes/route-todo.js';

const app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use('/', todo);

app.listen(conf.port, function () {
    console.log('app listening on port ' + conf.port + '!');
});