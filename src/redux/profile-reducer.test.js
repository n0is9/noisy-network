import profileReducer, {addPostActionCreator, deletePost} from "./profile-reducer";
import React from "react";


let state = {
    posts: [
        {id: 1, message: 'It is my first post', likesCount: 8},
        {id: 2, message: 'How are you?', likesCount: 11},
        {id: 3, message: 'It is my first post', likesCount: 8},
        {id: 4, message: 'How are you?', likesCount: 11},
    ]
};

it('length of post should be incremented', () => {
    // 1. test data
    let action = addPostActionCreator('hello')

    // 2. action
    let newState = profileReducer(state, action)

    //expectation
    expect(newState.posts.length).toBe(5)
})

it('message of new post should be correct', () => {
    // 1. test data
    let action = addPostActionCreator('hello')
    // 2. action
    let newState = profileReducer(state, action)

    //expectation
    expect (newState.posts[4].message).toBe('hello')
})


it('after deleting length should be decrement', () => {
    // 1. test data
    let action = deletePost(1)
    // 2. action
    let newState = profileReducer(state, action)

    //expectation
    expect (newState.posts.length).toBe(3)
})

it('after deleting length shouldnt be decrement if id is incorrect', () => {
    // 1. test data
    let action = deletePost(100)
    // 2. action
    let newState = profileReducer(state, action)

    //expectation
    expect (newState.posts.length).toBe(4)
})
