const initMainState = {
    navbarToggle: false,
    dialogOpen: false
};
export function main(state = initMainState, action) {
    switch (action.type) {
        case '@MAIN/TOGGLE_NAVBAR':
            return {
                ...state,
                navbarToggle: !state.navbarToggle
            };
        case '@MAIN/OPEN_DIALOG' :
            return {
                ...state,
                dialogOpen: true
            };
        case '@MAIN/CLOSE_DIALOG' :
            return {
                ...state,
                dialogOpen: false
            };
        default:
            return state;
    }
}
