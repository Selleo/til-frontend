import reducer from "../../store/reducers/reducers";
import * as actionTypes from "../../store/actionTypes";
import * as data from "../../dummyData";

describe("reducers", () => {
  it("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual(data.initialState);
  });

  it("should handle GET_ALL_CATEGORIES", () => {
    expect(
      reducer(data.initialState, {
        type: actionTypes.GET_ALL_CATEGORIES,
        categories: data.categories
      })
    ).toEqual({
      ...data.initialState,
      categories: data.categories
    });
  });

  it("should handle GET_CURRENT_USER", () => {
    expect(
      reducer(data.initialState, {
        type: actionTypes.GET_CURRENT_USER,
        currentUser: data.user
      })
    ).toEqual({
      ...data.initialState,
      currentUser: data.user
    });
  });

  it("should handle GET_ALL_USERS", () => {
    expect(
      reducer(data.initialState, {
        type: actionTypes.GET_ALL_USERS,
        users: data.allUsers
      })
    ).toEqual({
      ...data.initialState,
      users: data.allUsers
    });
  });

  it("should handle GET_ALL_POSTS", () => {
    expect(
      reducer(data.initialState, {
        type: actionTypes.GET_ALL_POSTS,
        posts: data.posts
      })
    ).toEqual({
      ...data.initialState,
      posts: data.posts
    });
  });
});
