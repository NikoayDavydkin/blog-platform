/* eslint-disable semi */
import React, { useState } from 'react';
import './forms.css';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { withRouter } from 'react-router-dom';

const EditArticle = ({ history, editArticle, dataArticles }) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    let { title, description, text, ...rest } = data;

    let massTags = [];

    for (let key in rest) {
      massTags.push(rest[key]);
    }

    editArticle(
      {
        title: title,
        description: description,
        body: text,
        tags: [...massTags],
      },
      dataArticles.slug
    );

    reset();
    history.push('/');
  };

  const [tags, setTags] = useState([
    {
      id: uuidv4(),
      value: '',
    },
  ]);

  const addTag = () => {
    const item = {
      id: uuidv4(),
      value: '',
    };

    const newMass = [...tags];
    newMass.push(item);
    setTags(newMass);
  };

  const deleteTag = (id) => {
    if (tags.length > 1) {
      let newMass = [...tags];
      const result = newMass.filter((tags) => tags.id !== id);

      setTags(result);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="app__create-article create-article">
      <span className="create-article__title">Edit article</span>
      <div className="create-article__inputs">
        {/*Title*/}
        <span>Tiltle</span>
        <input
          className={errors?.title && 'form-invalid'}
          {...register('title', {
            minLength: {
              value: 1,
              message: 'Less than 1 characters entered',
            },
          })}
          type="text"
          placeholder="Title"
        ></input>
        <div className="errors-info">{errors?.title && <p>{errors?.title?.message || 'error!'}</p>}</div>

        {/*Short description*/}
        <span>Short description</span>
        <input
          className={errors?.description && 'form-invalid'}
          {...register('description', {
            minLength: {
              value: 1,
              message: 'Less than 1 characters entered',
            },
          })}
          type="text"
          placeholder="Short description"
        ></input>
        <div className="errors-info">{errors?.description && <p>{errors?.description?.message || 'error!'}</p>}</div>

        {/*Text*/}
        <span>Text</span>
        <textarea
          className={errors?.text && 'form-invalid'}
          {...register('text', {
            minLength: {
              value: 1,
              message: 'Less than 1 characters entered',
            },
          })}
          type="text"
          placeholder="Text"
        />
        <div className="errors-info">{errors?.text && <p>{errors?.text?.message || 'error!'}</p>}</div>

        <span>Tags</span>
        <div className="create-article__tags">
          <ul className="create-article__tags-ul">
            {tags.map((item) => {
              return (
                <li key={item.id}>
                  {/*Tag*/}
                  <input {...register(`tag${item.id}`)} type="text" placeholder="Tag"></input>

                  <div
                    onClick={() => {
                      deleteTag(item.id);
                    }}
                  >
                    Delete
                  </div>
                </li>
              );
            })}
          </ul>
          <div
            className="create-article__tags-button"
            onClick={() => {
              addTag();
            }}
          >
            Add tag
          </div>
        </div>
      </div>
      <button disabled={!isValid} className="create-article__send-button">
        Send
      </button>
    </form>
  );
};

export default withRouter(EditArticle);
