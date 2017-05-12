import {listPosts as listPostsFromApi} from "api/posts.js";

function startLoadPosts() {
	return {
		type: "@POST/START_LOAD_POSTS"
	};
}

function endLoadPosts(posts) {
	return {
		type: "@POST/END_LOAD_POSTS",
		posts
	};
}

function resetPosts() {
	return {
		type: "@POST/RESET_POSTS"
	};
}

export function listPosts(searchText = '') {
	return (dispatch, getState) => {
		dispatch(startLoadPosts());
		return listPostsFromApi(searchText).then(posts => {
			dispatch(endLoadPosts(posts));
		}).catch(err => {
			console.log("Error loading posts", err);
			dispatch(resetPosts());
		});
	};
}

export function setMood(mood) {
	return {
		type: "@POST_FORM/SET_MOOD",
		mood
	};
}

export function updateInputBox(text) {
	let rtn = {
		type: "@POST_FORM/UPDATE_INPUT_BOX",
		inputValue: text
	};
	if (text) {
		rtn["inputDanger"] = false;
	}
	return rtn;
}

export function toggleMood() {
	return {
		type: "@POST_FORM/TOGGLE_MOOD"
	};
}

export function inputIsDanger() {
	return {
		type: "@POST_FORM/INPUT_IS_DANGER"
	};
}

export function clearAfterPost() {
	return {
		type: "@POST_FORM/CLEAR_AFTER_POST"
	};
}

export function setTooltipOpen(id, tooltipOpen) {
	return {
		type: "@POST_ITEM/SET_TOOLTIP_OPEN",
		tooltipOpen,
		id
	};
}

export function toggleTooltipOpen(id) {
	return {
		type: "@POST_ITEM/TOGGLE_TOOLTIP_OPEN",
		id
	};
}

export function updateSearchBox(searchText) {
	return {
		type: "@MAIN/UPDATE_SEARCH_BOX",
		searchText
	};
}

export function toggleNavbar() {
	return {
		type: "@MAIN/TOGGLE_NAVBAR"
	};
}
