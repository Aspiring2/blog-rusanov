import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../axios";
import { Post } from "../components/Post";
import { AddComment } from '../components/AddComment';
import { CommentsBlock } from "../components/CommentsBlock";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export const FullPost = () => {
  const [postData, setPostData] = useState(null);
  const [commentsData, setCommentsData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user's login status
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postResponse, commentsResponse] = await Promise.all([
          axios.get(`/posts/${id}`),
          axios.get(`/posts/${id}/comments`)
        ]);
        
        setPostData(postResponse.data);
        setCommentsData(commentsResponse.data);
        setLoading(false);
      } catch (error) {
        console.warn(error);
        alert("Ошибка при получении статьи и комментариев");
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  // Format the createdAt date
  const formattedDate = new Date(postData.createdAt).toLocaleString();

  return (
    <>
      <Post
        id={postData._id}
        title={postData.title}
        imageUrl={postData.imageUrl ? `http://localhost:4444${postData.imageUrl}` : ""}
        user={postData.user}
        createdAt={formattedDate} // Use the formatted date
        viewsCount={postData.viewsCount}
        commentsCount={3}
        tags={Array.isArray(postData.tags) ? postData.tags : [postData.tags]}
        isFullPost
      >
        <ReactMarkdown>{postData.text}</ReactMarkdown>
      </Post>
      <CommentsBlock items={commentsData} isLoading={false}>
        <AddComment postId={id} userAvatarUrl={postData.user.avatarUrl} isLoggedIn={isLoggedIn} />
      </CommentsBlock>
    </>
  );
};