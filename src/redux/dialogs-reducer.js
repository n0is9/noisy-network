const SEND_MESSAGE = 'SEND_MESSAGE';

let initialState = {
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
]
};

const dialogsReducer = (state = initialState,  action) => {
    switch (action.type){
        case SEND_MESSAGE:
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: body}],
            };
        default:
            return state
    }
}

export const sendMessageCreator = (newMessageBody) => ({type: SEND_MESSAGE, newMessageBody})

export default dialogsReducer;