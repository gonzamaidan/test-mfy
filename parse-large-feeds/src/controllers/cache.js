import https from 'https';
import fs from 'fs';
import moment from 'moment'

module.exports = function(cb, {url}) {
	let lastcachePath = "./src/cache/lastcache";
	const lastcache = fs.existsSync(lastcachePath) ? fs.readFileSync(lastcachePath).toString() : moment("2000", "YYYY");
	if(moment(lastcache, "YYYY-MM-DD HH:mm").isBefore(moment().subtract(12, 'hours'))) {
		https.get(url, (res) => {
			res.on('data', (d) => {
				fs.appendFileSync('./src/cache/cache.xml', d, function (err) {
					if (err) throw err;
				});
			});
			res.on('end', () => {
				fs.writeFileSync(lastcachePath, moment().format("YYYY-MM-DD HH:mm"));
				cb()
			})
			
		}).on('error', (e) => {
			console.error(e);
		});
	} else {
		cb()
	}
}
