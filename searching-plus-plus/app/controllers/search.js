const commons = require('../commons');
const { get } = commons.repository('properties');
const Rx = require('rx')


module.exports = function searchController(req, res, next) {
  const response = {
    results: []
  };

  const q = req.query['q'];
  const p = parseInt(req.query['p']) || 1;
  let cantidadPorPagina = 12;
  const skip = (p - 1) * cantidadPorPagina
  const onDone = () => res.json(response);
  const onError = (err) => next(err);
  const datasource = get();
	let filter = property =>
		property.street.toLowerCase().includes(q.toLowerCase()) ||
		property.area.toLowerCase().includes(q.toLowerCase()) ||
		property.county.toLowerCase().includes(q.toLowerCase()) ||
		property.province.toLowerCase().includes(q.toLowerCase());
	const count = datasource.count(filter);
	const results = datasource
		.filter(filter
      )
        .skip(skip)
      .take(cantidadPorPagina).toArray();
	Rx.Observable.combineLatest(count, results,(count, results) => ({count, results})).subscribe(({count, results}) => {
    response.count = count
    response.results = results
  }, onError, onDone);
};
