import React from "react";
import { Switch, Route } from "react-router-dom";
import RandomPost from "../components/RandomPost";
import Stats from "../components/Stats";
import PostsList from "../components/PostsList";
import DisplayPost from "../components/DisplayPost";
import Categories from "./Categories";
import UserPosts from "./UsersPosts";

const MainRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={PostsList} />
      <Route path="/random-post" component={RandomPost} />
      <Route path="/stats" component={Stats} />
      <Route path="/categories" component={Categories} />
      <Route path="/posts/:id" component={DisplayPost} />
      <Route path="/user-posts/:id" component={UserPosts} />
    </Switch>
  );
};

export default MainRoutes;
