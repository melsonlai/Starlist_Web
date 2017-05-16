import axios from 'axios';
import uuid from 'uuid/v4';
import moment from 'moment';
import 'babel-polyfill';

const todoKey = 'todos';
const todoBaseUrl = 'http://localhost:3000/api';

export function listTodos(unaccomplishedOnly = false, searchText = '', userID) {
	/*if (localStorage.getItem(todoKey) == null) localStorage.setItem(todoKey, JSON.stringify([]));
	return new Promise((resolve, reject) => {
		let todos = JSON.parse(localStorage.getItem(todoKey));

		if (unaccomplishedOnly) {
			todos = todos.filter(t => {
				return !t.doneTs;
			});
		}
		if (searchText) {
			todos = todos.filter(t => {
				return t.text.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
			});
		}
		resolve(todos);
	});*/
	let url = `${todoBaseUrl}/${todoKey}/${userID}`;
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

export function createTodo(title, descript, importance, date, isFullDay, time, userID) {
	const deadline = isFullDay ? (moment(date).add(1, 'd')) : (moment(date).add(time.getHours(), 'h').add(time.getMinutes(), 'm'));
/*	return listTodos().then(todos => {
		const newTodo = {
			id: uuid(),
			title: title,
			content: descript,
			deadline: deadline.unix(),
			importance: importance,
			starID: uuid(),
			ts: moment().unix(),
			doneTs: null
		};
		todos.push(newTodo);
		localStorage.setItem(todoKey, JSON.stringify(todos));

		return newTodo;
	});*/
	let url = `${todoBaseUrl}/${todoKey}/${userID}`;

    console.log(`Making POST request to: ${url}`);

    return axios.post(url, {
        title,
		content: descript,
		importance,
		deadline: deadline.unix()
    }).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function accomplishTodo(id) {
/*	return listTodos().then(todos => {
		let rtn;

		for(let t of todos) {
			if(t.id === id) {
				t.doneTs = moment().unix();
				rtn = t;
				break;
			}
		}
		localStorage.setItem(todoKey, JSON.stringify(todos));

		return rtn;
	});*/
	let url = `${todoBaseUrl}/${todoKey}/92bdf02a-05ea-49a1-bfc1-d7fa1722dcd3/${id}?accomplish=1`;

    console.log(`Making POST request to: ${url}`);

    return axios.put(url).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

function delTodoItem(id, userID) {
	let url = `${todoBaseUrl}/${todoKey}/92bdf02a-05ea-49a1-bfc1-d7fa1722dcd3/${id}`;

	return axios.delete(url).then(function(res) {
		if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
	});
}
