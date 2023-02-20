import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'It is me first post', likesCount: 8},
                {id: 1, message: 'How are you?', likesCount: 11},
            ],
            newPostText: 'it-kum.com'
        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Artem'},
                {id: 2, name: 'Anna'},
                {id: 3, name: 'Vlad'},
                {id: 4, name: 'Dima'},
                {id: 5, name: 'Sasha'},
                {id: 6, name: 'Anton'}
            ],
            messages: [
                {id: 1, message: 'Hello'},
                {id: 2, message: 'How are you?'},
                {id: 3, message: 'ahhahaha'},
                {id: 4, message: 'loremloremlorem'},
                {id: 5, message: 'RTS'}
            ],
            newMessageBody: '',
        },
        sidebar: {}
    },
    getState () {
        return this._state;
    },
    subscribe (observer) {
        this._callSubscriber = observer;
    },
    _callSubscriber () {
        console.log('state changed')
    },
    dispatch (action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.sidebar = sidebarReducer(this._state.sidebar, action)
        this._callSubscriber(this._state);
    }
}





export default store;
window.state = store;