import {
    listTodos as listTodosFromApi,
    createTodo as createTodoFromApi,
    accomplishTodo as accomplishTodoFromApi
} from 'api/todos.js';

/*  Todo Form */

export function inputTitle(titleValue) {
    return {
        type: '@TODO_FORM/INPUT_TITLE',
        titleValue
    };
};

export function inputTitleDanger(titleDanger) {
    return {
        type: '@TODO_FORM/INPUT_TITLE_DANGER',
        titleDanger
    };
};

export function inputDescript(descriptValue) {
    return {
        type: '@TODO_FORM/INPUT_DESCRIPT',
        descriptValue
    };
};

export function setImportance(inputImportance) {
	return {
		type: "@TODO_FORM/SET_IMPORTANCE",
		inputImportance
	};
}

export function setDeadlineDate(inputDeadlineDate) {
	return {
		type: "@TODO_FORM/SET_DEADLINE_DATE",
		inputDeadlineDate
	};
}

export function setFullDayDeadline(isChecked) {
	return {
		type: "@TODO_FORM/SET_FULL_DAY_DEADLINE",
		inputFullDayDeadline: isChecked
	};
}

export function setDeadlineTime(time) {
	return {
		type: "@TODO_FORM/SET_DEADLINE_TIME",
		inputDeadlineTime: time
	};
}

export function toggleMood() {
    return {
        type: '@TODO_FORM/TOGGLE_MOOD'
    };
};

export function setMoodToggle(toggle) {
    return {
        type: '@TODO_FORM/SET_MOOD_TOGGLE',
        toggle
    };
};

export function selectMood(mood) {
    return {
        type: '@TODO_FORM/SELECT_MOOD',
        mood
    };
};


/*  Todos */

function startLoading() {
    return {
        type: '@TODO/START_LOADING'
    };
}

function endLoading() {
    return {
        type: '@TODO/END_LOADING'
    };
}

function endListTodos(todos) {
    return {
        type: '@TODO/END_LIST_TODOS',
        todos
    };
}

export function listTodos(searchText, loading = false) {
    return (dispatch, getState) => {
        if (!loading)
            dispatch(startLoading());

        return listTodosFromApi(getState().todo.unaccomplishedOnly, searchText).then(todos => {
            dispatch(endListTodos(todos));
            dispatch(endLoading());
        }).catch(err => {
            console.error('Error listing todos', err);
            dispatch(endLoading());
        });
    }
}

export function createTodo(title, descript, importance, date, isFullDay, time) {
    return (dispatch, getState) => {
        dispatch(startLoading());

        return createTodoFromApi(title, descript, importance, date, isFullDay, time).then(() => {
            dispatch(listTodos(getState().searchText, true));
        }).catch(err => {
            console.error('Error creating todos', err);
            dispatch(endLoading());
        });
    };
};

export function accomplishTodo(id) {
    return (dispatch, getState) => {
        dispatch(startLoading(true));

        return accomplishTodoFromApi(id).then(() => {
            dispatch(listTodos(getState().searchText, true));
        }).catch(err => {
            console.error('Error accomplishing todos', err);
            dispatch(endLoading());
        });
    }
}

function toggleUnaccomplishedOnly() {
    return {
        type: '@TODO/TOGGLE_UNACCOMPLISHED_ONLY'
    };
}

export function toggleAndList() {
    return (dispatch, getState) => {
        dispatch(toggleUnaccomplishedOnly());
        return dispatch(listTodos(getState().searchText));
    }
}
