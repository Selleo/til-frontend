import * as actions from "../../store/actions/actions";
import * as actionTypes from "../../store/actionTypes";
import * as data from "../../dummyData";

describe("actions", () => {
  it("should create an action to get all users", () => {
    const users = data.allUsers;
    const expectedAction = {
      type: actionTypes.GET_ALL_USERS,
      users
    };

    expect(actions.getAllUsers(users)).toEqual(expectedAction);
  });

  it("should create an action to get current user", () => {
    const currentUser = data.currentUser;
    const expectedAction = {
      type: actionTypes.GET_CURRENT_USER,
      currentUser
    };

    expect(actions.getCurrentUser(currentUser)).toEqual(
      expectedAction
    );
  });

  it("should create an action to get all posts", () => {
    const posts = data.posts;
    const expectedAction = {
      type: actionTypes.GET_ALL_POSTS,
      posts
    };

    expect(actions.getPosts(posts)).toEqual(expectedAction);
  });

  it("should create an action to get all categories", () => {
    const categories = data.categories;
    const expectedAction = {
      type: actionTypes.GET_ALL_CATEGORIES,
      categories
    };

    expect(actions.getAllCategories(categories)).toEqual(
      expectedAction
    );
  });
});
