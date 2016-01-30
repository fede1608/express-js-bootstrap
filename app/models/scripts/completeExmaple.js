var orm = require('orm');

var init = function () {
    orm.connect('postgres://michelagopian:@127.0.0.1:5432/books', function (err, db) {
      if (err) throw err;

        console.log('Connected to db!');

        var Book  = db.define('book', {
            name      :     { type: 'text', required: true },
            author    :     { type: 'text' },
            publisher :     { type: 'text' },
            price     :     { type: 'number' },
            link      :     { type: 'text' },
            year      :     { type: 'integer' }
        });
        var User = db.define('user', {
            firstName   :   { type: 'text', required: true },
            lastName    :   { type: 'text', required: true },
            username    :   { type: 'text', required: true },
            email       :   { type: 'text', required: true },
            password    :   { type: 'text', required: true }
        }, {
            validations: {
                username    :   orm.enforce.unique('username already taken!'),
                email       :   orm.enforce.unique('email already taken!') 
            }
        });

        // add the table to the database
        db.sync(function(err) { 
            if (err) throw err;

            console.log('Sync db!');

            // var book = {
            //     name:      'Libro de mishu',
            //     author:    'mishuagopian',
            //     'year':    2012
            // };
            // // add a row to the person table
            // Book.create(book, function(err) {
            //     if (err) throw err;

            //     console.log('Person created!');

            //     // query the person table by surname
            //     Book.find({ name: "Libro de mishu" }, function (err, books) {
            //         if (err) throw err;

            //         console.log("People found: %d", books.length);
            //         console.log("First person: %s, year %d", books[0].name, books[0].year);
            //     });
            // });
        });
    });
};

init();