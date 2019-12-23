import feedParser from '../src/controllers/parse-feed.js';
import assert from 'assert';

const resultExpected = {
	id: 836619,
	url: "http://www.adrianamoyanopropiedades.com.ar/836619",
	title: "Venta Departamento en La Plata G.B.A. Zona Sur 9  317"
}

describe('Feed parser', () => {
	it('should parse the feed from example stream', done => {
			feedParser("./src/cache/cache_test.xml", {
				closetag: (node, results) => {
					if(node == "ad") {
						assert.equal(resultExpected.id, results.ad.id);
						assert.equal(resultExpected.url, results.ad.url);
						assert.equal(resultExpected.title, results.ad.title);
						done();
					}
				}
			})
	});
});
