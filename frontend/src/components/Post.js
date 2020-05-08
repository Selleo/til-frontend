import React from "react";
import Markdown from "./Markdown";
import CopyPostURL from "./CopyURL";
import PostCategories from "./PostCategories";
import ReactionBar from "./ReactionBar";
import StyledPost from "../styles/StyledPost";
import StyledPostInfo from "../styles/StyledPostInfo";
import StyledTitleLink from "../styles/StyledTitleLink";

const Post = ({ post }) => (
  <section>
    <StyledPost>
        <StyledPostInfo>
          <img src={post.author.image} />
          <div className="date-author">
            <p className="author">
              {post.author.firstName} {post.author.lastName}
            </p>
            <p className="date">date</p>
          </div>
        </StyledPostInfo>
        <StyledTitleLink to={`/posts/${post.id}`}>{post.title}</StyledTitleLink>
        <Markdown source={post.body} />
        <CopyPostURL postId={post.id} />
        <PostCategories categories={post.categories} />
        <ReactionBar post={post} />
    </StyledPost>
  </section>
);

export default Post;
