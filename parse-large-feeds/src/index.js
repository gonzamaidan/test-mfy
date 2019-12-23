import { createLogger } from 'bunyan';
import fs from 'fs'

const logger = createLogger({name: 'feedparser'});
const feedParser = require('./controllers/parse-feed')
const cache = require('./controllers/cache')
if (!fs.existsSync('./out')){
	fs.mkdirSync('./out');
}

cache(() => feedParser("./src/cache/cache.xml", {}), {url: 'https://panel.siprop.com/propiedades/export/id/utq0yl2wda'})

