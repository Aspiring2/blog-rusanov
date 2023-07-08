import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../axios";
import { Service } from "../components/Service";
// import { AddComment } from '../components/AddComment';
// import { CommentsBlock } from "../components/CommentsBlock";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export const FullService = () => {
  const [serviceData, setServiceData] = useState(null);
  const [commentsData, setCommentsData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  // const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user's login status
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [serviceResponse, commentsResponse] = await Promise.all([
          axios.get(`/services/${id}`),
          axios.get(`/services/${id}/comments`)
        ]);
        
        setServiceData(serviceResponse.data);
        setCommentsData(commentsResponse.data);
        setLoading(false);
      } catch (error) {
        console.warn(error);
        alert("Ошибка при получении сервиса и комментариев");
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) {
    return <Service isLoading={isLoading} isFullService />;
  }

  // Format the createdAt date
  const formattedDate = new Date(serviceData.createdAt).toLocaleString();

  return (
    <>
      <Service
        id={serviceData._id}
        title={serviceData.title}
        imageUrl={serviceData.imageUrl ? `https://rusanov-d/api${serviceData.imageUrl}` : ""}
        user={serviceData.user}
        createdAt={formattedDate} // Use the formatted date
        viewsCount={serviceData.viewsCount}
        commentsCount={3}
        tags={Array.isArray(serviceData.tags) ? serviceData.tags : [serviceData.tags]}
        isFullService
      >
        <ReactMarkdown>{serviceData.text}</ReactMarkdown>
      </Service>
      {/* <CommentsBlock items={commentsData} isLoading={false}>
        <AddComment serviceId={id} userAvatarUrl={serviceData.user.avatarUrl} isLoggedIn={isLoggedIn} />
      </CommentsBlock> */}
    </>
  );
};