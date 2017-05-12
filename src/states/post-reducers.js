const initPostsState = {
	posts: [],
	postLoading: false
};

export function posts(state = initPostsState, action) {
	switch (action.type) {
		case "@POST/START_LOAD_POSTS": {
			return {
				...state,
				postLoading: true
			};
		}
		case "@POST/END_LOAD_POSTS": {
			return {
				...state,
				postLoading: false,
				posts: action.posts
			}
		}
		case "@POST/RESET_POSTS": {
			return {
				...initPostsState,
				postLoading: state.postLoading
			};
		}
		default: {
			return state;
		}
	}
}

const initPostFormState = {
	inputValue: "",
	inputDanger: false,
	moodToggle: false,
	mood: "na"
}

export function postForm(state = initPostFormState, action) {
	switch (action.type) {
		case "@POST_FORM/SET_MOOD": {
			return {
				...state,
				mood: action.mood
			};
		}
		case "@POST_FORM/UPDATE_INPUT_BOX": {
			let rtn = {
				...state,
				inputValue: action.inputValue
			};
			if ("inputDanger" in action) {
				rtn["inputDanger"] = false;
			}
			return rtn;
		}
		case "@POST_FORM/TOGGLE_MOOD": {
			return {
				...state,
				moodToggle: !state.moodToggle
			};
		}
		case "@POST_FORM/INPUT_IS_DANGER": {
			return {
				...state,
				inputDanger: true
			};
		}
		case "@POST_FORM/CLEAR_AFTER_POST": {
			return {
				...state,
				inputValue: "",
				mood: "na"
			};
		}
		default: {
			return state;
		}
	}
}

const initPostItemState = {
	tooltipOpen: ""
}

export function postItem(state = initPostItemState, action) {
	switch (action.type) {
		case "@POST_ITEM/SET_TOOLTIP_OPEN": {
			return {
				...state,
				tooltipOpen: action.tooltipOpen ? action.id : ""
			};
		}
		case "@POST_ITEM/TOGGLE_TOOLTIP_OPEN": {
			return {
				...state,
				tooltipOpen: state.tooltipOpen ? "" : action.id
			};
		}
		default: {
			return state;
		}
	}
}

const initMainState = {
	navbarToggle: false,
	searchText: ""
}

export function main(state = initMainState, action) {
	switch (action.type) {
		case "@MAIN/UPDATE_SEARCH_BOX": {
			return {
				...state,
				searchText: action.searchText
			};
		}
		case "@MAIN/TOGGLE_NAVBAR": {
			return {
				...state,
				navbarToggle: !state.navbarToggle
			}
		}
		default: {
			return state;
		}
	}
}
