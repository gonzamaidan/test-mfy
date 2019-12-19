'use strict';
const commons = require('../../../commons');
const { get } = commons.repository('properties');
const masterLogger = commons.logger.child({ controller: 'valuation' });
const {mean, max, min, standardDeviation} = require('simple-statistics')

/**
 * Valida que la zona sea la misma de la propiedad en el niveles superiores
 * @param province
 * @param area
 * @param county
 * @param zone
 */
function validarZonas({province, area, county}, zone) {
	if(province.toLowerCase() == zone.nombre) {
		if(!zone.province) zone.province = province;
		return;
	}
	if(area.toLowerCase() == zone.nombre) {
		if(!zone.province) zone.province = province;
		if(!zone.area) zone.area = area;
		if(zone.province != province) throw Error("Different provinces for place")
		return;
	}
	if(county.toLowerCase() == zone.nombre) {
		if(!zone.province) zone.province = province;
		if(!zone.area) zone.area = area;
		if(zone.province != province) throw Error("Different provinces for place")
		if(zone.area != area) throw Error("Different areas for place")
	}
}
/**
 * Get statistical information about a zone. Returns:
 *  - An object that contains key value pairs with operation as key and
 *    a nested object of property type and min, max, mean and std deviation.
 *
 * Example (not actual data):
 *
 *  /api/v1/zone/flores/valuation
 *     {
 *        "2": {
 *          "7": {
 *            "min": 78000,
 *            "max": 190000,
 *            "mean": 134000,
 *            "stddev": 5400
 *          },
 *          "2": {
 *            "min": 78000,
 *            "max": 190000,
 *            "mean": 134000,
 *            "stddev": 5400
 *          },
 *          ...
 *        },
 *        "1": { ... }
 *     }
 *
 * @param {Request} req
 * @param {Response} res
 */
module.exports = function zoneNameValuationController(req, res) {
	const logger = masterLogger.child({ fn: 'zoneNameValuationController' });
	logger.debug('received request')
	const datasource = get();
	const body = {};
	const valuationsObject = {}
	const zona = {
		nombre: req.params.name.toLowerCase()
	}
	
	const onError = (err) => {
		logger.error(err);
		res.status(418).send(err.message)
	};
	const onFinished = () => {
		logger.trace(valuationsObject);
		const operationsKeys = Object.keys(valuationsObject);
		if(!operationsKeys.length) {
			res.status(418).send('No place found')
			return;
		}
		operationsKeys.map(operationKey => {
			body[operationKey] = {};
			Object.keys(valuationsObject[operationKey]).map(bldgTypeKey => {
				const values = valuationsObject[operationKey][bldgTypeKey].sort()
				body[operationKey][bldgTypeKey] = {
					min: min(values),
					max: max(values),
					mean: mean(values),
					stddev: standardDeviation(values)
				}
			})
		})
		res.json(body)
	};
	datasource.filter(
		property =>
			property.province.toLowerCase() == zona.nombre ||
			property.area.toLowerCase() == zona.nombre ||
			property.county.toLowerCase() == zona.nombre
	).map(property => {
		validarZonas(property, zona);
		return property;
	}).subscribe(({operation, bldgType, valuation}) => {
		if(!valuationsObject[operation]) valuationsObject[operation] = {};
		if(!valuationsObject[operation][bldgType]) valuationsObject[operation][bldgType] = []
		valuationsObject[operation][bldgType].push(parseInt(valuation))
	}, onError, onFinished);
};
