var pg = require('pg');
var jsSHA = require("jssha");

// require('dotenv').load();

var conString = "postgres://jwslkgtiftknsd:UXQaMgjW5g2-54lMDGBmAHDyOj@ec2-54-204-3-188.compute-1.amazonaws.com:5432/d4dsb3bqnop0d0?ssl=true&sslfactory=org.postgresql.ssl.NonValidatingFactory";

module.exports = {
  createPart: function(newPart, cb) {
    console.log(newPart.partName)

    if(newPart.hasSerialNumber) {
      newPart.quantity = 1;
    }

    pg.connect(conString, function(err, client, done) {
      if(err) {
        return console.error('error fetching client from pool', err);
      }
      client.query('INSERT INTO part_type (name, part_number, has_serial_number, quantity) VALUES ($1, $2, $3, $4) RETURNING id',
      [newPart.partName, newPart.partNumber, newPart.hasSerialNumber, newPart.quantity], function(err, result) {
        //call `done()` to release the client back to the pool
        done();

        if(err) {
          return console.error('error running query', err);
        }

        cb(result.rows[0].id)
      });
    });
  },

  createSerialNumber: function(newPart) {

    pg.connect(conString, function(err, client, done) {
      if(err) {
        return console.error('error fetching client from pool', err);
      }
      client.query('INSERT INTO parts (part_type_id, serial_number) VALUES ($1, $2)',
      [newPart.partTypeId, newPart.serialNumber], function(err, result) {
        //call `done()` to release the client back to the pool
        done();

        if(err) {
          return console.error('error running query', err);
        }
      });
    });
  },
}
