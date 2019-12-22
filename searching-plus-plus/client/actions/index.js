import fetchPonyfill from 'fetch-ponyfill';
const { fetch } = fetchPonyfill();

export const ACTION_TYPES = {
    SEARCH: 'search',
    RESULT: 'result',
    COUNT: 'count'
}

const ACTIONS = {
    resultsReady: (results, count) => ({
        type: ACTION_TYPES.RESULT,
        results: results,
        count: count
    }),

    searchingFor: (text) => ({
        type: ACTION_TYPES.SEARCH,
        text: text
    }),
    searchFor: (text, page) => function asyncSearch(dispatch) {
        if (!text) { return; }
        dispatch(ACTIONS.searchingFor(text));
        fetch(`/api/v1/search?q=${encodeURIComponent(text)}&p=${page || 1}`).then((result) => {
            if (!result.ok) { return; }
            result.json().then((json) => {
                dispatch(ACTIONS.resultsReady(json.results, json.count));
            })
        });
    }
};

export default ACTIONS;
