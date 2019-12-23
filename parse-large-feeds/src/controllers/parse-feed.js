const sax = require("sax");
const strict = true;
const fs = require('fs')
const results = {
	ads: {}
}
const saxStream = sax.createStream(strict, {})
const { set } = require('lodash')
const addToFile = require('./add-to-file')

module.exports = (filename, {error, closetag}) => {
	saxStream.on("error", function (e) {
		console.error("error!", e)
		this._parser.error = null
		this._parser.resume()
		if(error) return error(e, this)
	})
	saxStream.on("opentag", function (node) {
		switch (node.name) {
			case 'ad':
				results.ad = {}
				break;
			case 'pictures':
				results.ad.pictures = [];
				break;
			case 'picture':
				results.ad.pictures.push({});
				results.pictureIndex = results.ad.pictures.length - 1;
				break;
			case 'picture_url':
				results.key = `pictures.${results.pictureIndex}.${node.name}`;
				break;
			default:
				results.key = node.name;
				results.attributes = node.attributes
		}
	})
	saxStream.on("cdata", function (data) {
		set(results.ad, results.key, data)
	})
	saxStream.on('closetag', function(node) {
		if(node == 'ad') {
			const property = results.ad;
			if(!results.ads[property.type]) results.ads[property.type] = {}
			if(!results.ads[property.type][property.property_type]) results.ads[property.type][property.property_type] = []
			results.ads[property.type][property.property_type].push(property);
		}
		if(closetag) return closetag(node, results)
	})
	saxStream.on('end', function () {
		Object.keys(results.ads).map(type => {
			addToFile(results.ads[type], type)
		})
	})
	
	fs.createReadStream(filename)
		.pipe(saxStream);
}
