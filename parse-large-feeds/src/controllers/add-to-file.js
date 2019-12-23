const fs = require('fs')
const jsonfile = require('jsonfile')
module.exports = function (property, filename) {
	const path = `./out/${filename}.json`
	jsonfile.writeFileSync(path, property);
}