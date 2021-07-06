import React from 'react';
import {AddPost, postsType, profileReducer, ProfileType, removePost} from "./profile-reducer";

let state = {
  status: '',
  posts: [
    {id: '1', message: 'Hi, how a you?', likesCount: 12},
    {id: '2', message: "It's my first post.", likesCount: 22}
  ] as Array<postsType>,
  profile: {
    aboutMe: null,
    contacts: {
      facebook: null,
      website: null,
      vk: null,
      twitter: null,
      instagram: null,
      youtube: null,
      github: null,
      mainLink: null
    },
    lookingForAJob: true,
    lookingForAJobDescription: null,
    fullName: null as string | null,
    userId: 1,
    photos: {
      small: null,
      large: null
    }
  } as ProfileType,
  isFetching: false
}


test('message of new post should be correct', () => {
  //test data
  let action= AddPost('My new post')
  //action
  let newState= profileReducer(state, action);
  //expectation
  expect(newState.posts.length).toBe(3)
});

test('length of posts should be incremented', () => {
  //test data
  let action= AddPost('My new post')
  //action
  let newState= profileReducer(state, action);
  //expectation
  expect(newState.posts[2].likesCount).toBe(0)
});

test('after deleting length of messages should be decrement', () => {
  //test data
  let action= removePost('1')
  //action
  let newState= profileReducer(state, action);
  //expectation
  expect(newState.posts.length).toBe(1)
});

test('after deleting length shouldn`t be decrement if id is incorrect', () => {
  //test data
  let action= removePost('10000')
  //action
  let newState= profileReducer(state, action);
  //expectation
  expect(newState.posts.length).toBe(2)
});