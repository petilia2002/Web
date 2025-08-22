import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useFetching } from "../../hooks/useFetching.js";
import PostService from "../../API/PostService.js";
import Loader from "../../UI/Loader/Loader";
import List from "../../components/List/List";
import Error from "../../UI/Error/Error";
import classes from "./Comments.module.css";

export default function Comments() {
  const { id: postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  const [postFetching, isPostLoaded, isPostError] = useFetching(async () => {
    const response = await PostService.getById(postId);
    setPost(response.data);
  });

  const [commentsFetching, isCommentsLoaded, isCommentsError] = useFetching(
    async () => {
      const response = await PostService.getComments(postId);
      setComments(response.data);
    }
  );

  useEffect(() => {
    postFetching();
    commentsFetching();
  }, []);

  return (
    <div className={classes.com_container}>
      <div className={classes.post_title}>
        {isPostLoaded ? (
          <p className={classes.title}>
            {post?.id} {post?.title}
          </p>
        ) : (
          <Loader />
        )}
        {isPostError && (
          <Error text={"Ошибка загрузки поста. Попробуйте позже.."} />
        )}
      </div>
      <div className={classes.comments}>
        {isCommentsLoaded ? (
          <List
            items={comments}
            renderItem={(com, index) => (
              <div key={com.id}>
                <h4>
                  {com.id} {com.email}
                </h4>
                <div>{com.body}</div>
              </div>
            )}
            condition={!isCommentsError}
            inThisCase={
              <Error
                text={"Ошибка загрузки комментариев. Попробуйте позже.."}
              />
            }
          />
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}
