import addToFile from '../src/controllers/add-to-file.js';
import assert from 'assert';
import fs from "fs"

if (!fs.existsSync('./out')){
	fs.mkdirSync('./out');
}

const json = {
	id: 836619,
	url: "http://www.adrianamoyanopropiedades.com.ar/836619",
	title: "Venta Departamento en La Plata G.B.A. Zona Sur 9  317"
}

describe('Add to file', () => {
	it('should create a file with the json', done => {
		let filename = "./out/test.json";
		addToFile(json, "test")
		const jsonRead = JSON.parse(fs.readFileSync(filename));
		assert.equal(jsonRead.id, json.id);
		assert.equal(jsonRead.url, json.url);
		assert.equal(jsonRead.title, json.title);
		fs.unlinkSync(filename)
		done();
	});
});
