/*
Anatomy of a serialized value:

String
s:size:value;

Integer
i:value;

Boolean
b:value; (does not store "true" or "false", stores '1' or '0')

Null
N;

Array
a:size:{key definition;value definition;(repeated per element)}

Object
O:strlen(object name):object name:object size:{s:strlen(property name):property name:property definition;(repeated per property)}

super secret tip: search for "npm php-serialize"
*/
const Serialize = require('php-serialize')
module.exports = function parseExtrasString(input) {
    return Serialize.unserialize(input);
}
