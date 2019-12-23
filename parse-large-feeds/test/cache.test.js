import cache from '../src/controllers/cache.js';
import assert from 'assert';
import fs from "fs";
import moment from 'moment';

describe('Cache', () => {
	let filename = "./src/cache/lastcache";
	it('should not change the lastcache', done => {
		const fechaInicial = moment();
		fs.writeFileSync(filename, fechaInicial.format("YYYY-MM-DD HH:mm"))
		cache(function() {
			const fechaFinal = fs.readFileSync(filename);
			assert.equal(fechaFinal, fechaInicial.format("YYYY-MM-DD HH:mm"));
			fs.unlinkSync(filename)
			done();
		}, {})
	});
	it('should change the lastcache', done => {
		const fechaInicial = moment().subtract(13, 'hours');
		fs.writeFileSync(filename, fechaInicial.format("YYYY-MM-DD HH:mm"))
		cache(function() {
			const fechaFinal = fs.readFileSync(filename);
			assert.notEqual(fechaFinal, fechaInicial.format("YYYY-MM-DD HH:mm"));
			fs.unlinkSync(filename)
			fs.unlinkSync('./src/cache/cache.xml')
			done();
		}, {url: "https://google.com"})
	})
});
