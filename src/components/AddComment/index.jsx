
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

import axios from '../../axios';

import styles from './AddComment.module.scss';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';

export const AddComment = ({ postId, userAvatarUrl }) => {
  const [commentText, setCommentText] = useState('');

  const isAuth = useSelector(selectIsAuth)
        
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuth) {
      alert('Please log in to leave comments');
      return;
    }
    try {
      const { data } = await axios.post(`/posts/${postId}/comments`, { text: commentText });
      console.log('Comment created:', data);
      // Reset the comment text
      setCommentText('');
    } catch (error) {
      console.error('Error creating comment:', error);
      alert('Failed to create comment');
    }
  };

  return (
    <div className={styles.root}>
      <Avatar classes={{ root: styles.avatar }} src={userAvatarUrl} />
      <form className={styles.form} onSubmit={handleSubmit}>
        <TextField
          label="Add a comment"
          variant="outlined"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          maxRows={10}
          multiline
          fullWidth
        />
        <Button type="submit" variant="contained">
          Send
        </Button>
      </form>
    </div>
  );
};