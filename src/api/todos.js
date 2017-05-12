import axios from 'axios';
import uuid from 'uuid/v4';
import moment from 'moment';
import 'babel-polyfill';

const todoKey = 'todos';
const todoBaseUrl = 'http://weathermood-10.ap-northeast-1.elasticbeanstalk.com/api';

export function listTodos(unaccomplishedOnly = false, searchText = '') {
	let url = `${todoBaseUrl}/todos`;
	if (searchText)
		url += `?searchText=${searchText}`;
	if (unaccomplishedOnly) {
		if (searchText) url += "&";
		else url += "?";
		url += "unaccomplishedOnly=1";
	}

	console.log(`Making GET request to: ${url}`);

	return axios.get(url).then(function(res) {
		if (res.status !== 200)
			throw new Error(`Unexpected response code: ${res.status}`);

		return res.data;
	});
}

export function createTodo(mood, text) {
	let url = `${todoBaseUrl}/todos`;

    console.log(`Making POST request to: ${url}`);

    return axios.post(url, {
        mood,
        text
    }).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function accomplishTodo(id) {
	let url = `${todoBaseUrl}/todos/${id}`;

    console.log(`Making POST request to: ${url}`);

    return axios.post(url).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}
