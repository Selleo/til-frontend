import React, { useState, useEffect } from "react";

import { handleLike, checkHasLiked } from "../utils";

const Likes = props => {
  const { likesCount, id, likes } = props.post;
  const [likesNumber, setLikesNumber] = useState(likesCount);
  const [hasLiked, setHasLiked] = useState(null);

  useEffect(() => {
    /* TODO fetch user uuid */
    const userId = "0cacc9b0-a114-40e2-8f47-838b3eb92c78";
    const didLike = checkHasLiked(likes, userId);

    setHasLiked(didLike);
  }, [likes]);

  const toggleLike = async () => {
    if (hasLiked) {
      const response = await handleLike(id, "DELETE");
      if (response) {
        setHasLiked(!hasLiked);
        setLikesNumber(likesNumber - 1);
      }
    } else {
      const response = await handleLike(id, "POST");
      if (response) {
        setHasLiked(!hasLiked);
        setLikesNumber(likesNumber + 1);
      }
    }
  };

  return (
    <button onClick={toggleLike}>
      Likes: {likesNumber} You {hasLiked ? "like" : "dont like"} it!
    </button>
  );
};

export default Likes;
