import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddService.module.scss';
import { selectIsAuth } from '../../redux/slices/auth';
import { useSelector } from 'react-redux';
import { useNavigate ,Navigate, useParams } from 'react-router-dom';
import axios from '../../axios';



export const AddService = () => {

  const { id } = useParams()
  const isAuth = useSelector(selectIsAuth)
  const isEditing = Boolean(id)

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = React.useState(false)
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  const inputFileRef = React.useRef(null)

  const handleChangeFile = async (event) => {
    try {
      const file = event.target.files[0]
      const formData = new FormData()
      formData.append('image', file)
      const { data } = await axios.post('/upload', formData)
      setImageUrl(data.url)
    } catch (error) {
      console.warn(error)
      alert('Ошибка при загрузке файла')
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl('')
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);


  const onSubmit = async () => {
    try {
      setIsLoading(true);
  
      const fields = {
        title,
        imageUrl,
        tags,
        text,
      };
      
      const { data } = isEditing ? 
        await axios.patch(`/services/${id}`, fields) :
        await axios.post('/services', fields);
        
      const _id = isEditing ? id : data._id;
  
      navigate(`/services/${_id}`);
    } catch (error) {
      console.warn(error);
      alert('Ошибка при создании статьи!');
    }
  };
  // console.log(fields)
  
  React.useEffect(() => {
    if (id) {
      axios.get(`/services/${id}`).then(({ data }) => {
        setTitle(data.title);
        setText(data.text);
        setImageUrl(data.imageUrl);
        setTags(data.tags.join(','));
      });      
    }
  }, [])

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  if (window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/" />
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      
      {imageUrl && (
      <>
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
            Удалить
          </Button>
          <img className={styles.image} src={`https://rusanov-d.ru/api${imageUrl}`} alt="Uploaded" />
       </>
      )}
     
    
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Заголовок статьи..."
        fullWidth
      />
      <TextField classes={{ root: styles.tags }}
      value={tags}
      onChange={(e) => setTags(e.target.value)}
      variant="standard" placeholder="Тэги" fullWidth />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          { isEditing ? 'Сохранить' : 'Опубликовать'}
        </Button>
        <Button size="large" onClick={() => navigate('/')}>
          Отмена
        </Button>
      </div>
    </Paper>
  );
};
