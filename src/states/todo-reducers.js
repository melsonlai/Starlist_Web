/* Todo Form */

const initTodoFormState = {
    inputValue: '',
    inputDanger: false,
    moodToggle: false,
    mood: 'na'
};
export function todoForm(state = initTodoFormState, action) {
    switch (action.type) {
        case '@TODO_FORM/INPUT_TITLE':
            return {
                ...state,
                inputTitleValue: action.titleValue
            };
        case '@TODO_FORM/INPUT_TITLE_DANGER':
            return {
                ...state,
                inputTitleDanger: action.titleDanger
            };
		case '@TODO_FORM/INPUT_DESCRIPT':
            return {
                ...state,
                inputDescriptValue: action.descriptValue
            };
		case "@TODO_FORM/SET_IMPORTANCE":
			return {
				...state,
				inputImportance: action.inputImportance
			};
        case '@TODO_FORM/TOGGLE_MOOD':
            return {
                ...state,
                moodToggle: !state.moodToggle
            };
        case '@TODO_FORM/SET_MOOD_TOGGLE':
            return {
                ...state,
                moodToggle: action.toggle
            };
        case '@TODO_FORM/SELECT_MOOD':
            return {
                ...state,
                mood: action.mood
            };
        default:
            return state;
    }
}

/* Todos */

const initTodoState = {
    todoLoading: false,
    todos: [],
    unaccomplishedOnly: false
};
export function todo(state = initTodoState, action) {
    switch (action.type) {
        case '@TODO/START_LOADING':
            return {
                ...state,
                todoLoading: true
            };
        case '@TODO/END_LOADING':
            return {
                ...state,
                todoLoading: false
            };
        case '@TODO/END_LIST_TODOS':
            return {
                ...state,
                todos: action.todos
            };
        case '@TODO/TOGGLE_UNACCOMPLISHED_ONLY':
            return {
                ...state,
                unaccomplishedOnly: !state.unaccomplishedOnly
            };
        default:
            return state;
    }
}
