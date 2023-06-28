import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts, fetchTags } from '../redux/slices/posts';

export const Tags = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { posts, tags } = useSelector((state) => state.posts);
  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';
  const [selectedTab, setSelectedTab] = React.useState(0);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchPosts({ tag: id }));
    dispatch(fetchTags());
  }, [dispatch, id]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

// Filter the posts based on the tag
const filteredPosts = posts.items.filter((post) =>
post.tags.includes(id)
);

let sortedPosts = filteredPosts; // Use the filtered posts

if (selectedTab === 0) {
// Sort by creation date
sortedPosts = [...filteredPosts].sort(
  (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
);
} else if (selectedTab === 1) {
// Sort by views count
sortedPosts = [...filteredPosts].sort((a, b) => b.viewsCount - a.viewsCount);
}

  return (
    <>
        <h1>{id}</h1>
      <Tabs
        style={{ marginBottom: 15 }}
        value={selectedTab}
        onChange={handleTabChange}
        aria-label="basic tabs example"
      >
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : sortedPosts).map((obj, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ''}
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={3}
                tags={[obj.tags]}
                isEditable={userData?._id === obj.user._id}
              />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text:
                  'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
