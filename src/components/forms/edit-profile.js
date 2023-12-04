/* eslint-disable no-useless-escape */
/* eslint-disable semi */
import React from 'react';
import './forms.css';
import { useForm } from 'react-hook-form';
import { withRouter } from 'react-router-dom';

const EditProfile = ({ editProfile, history }) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    editProfile({
      email: data.emailAddress,
      username: data.username,
      image: data.avatarImage,
    });
    reset();
    history.push('/');
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="app__edit-profile edit-profile">
      <span className="edit-profile__title">Edit Profile</span>
      <div className="edit-profile__inputs">
        {/*username*/}
        <span>Username</span>
        <input
          className={errors?.username && 'form-invalid'}
          {...register('username', {
            minLength: {
              value: 2,
              message: 'Less than 2 characters entered',
            },
          })}
          type="text"
          placeholder="Username"
        ></input>
        <div className="errors-info">{errors?.username && <p>{errors?.username?.message || 'Error!'}</p>}</div>

        {/*email addres*/}
        <span>Email address</span>
        <input
          className={errors?.emailAddress && 'form-invalid'}
          {...register('emailAddress', {
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
              message: 'not valid email',
            },
          })}
          placeholder="Email address"
          type="email"
        ></input>
        <div className="errors-info">{errors?.emailAddress && <p>{errors?.emailAddress?.message || 'Error!'}</p>}</div>

        {/*New Password*/}
        <span>New Password</span>

        <input
          className={errors?.newPassword && 'form-invalid'}
          {...register('newPassword', {
            minLength: {
              value: 7,
              message: 'Less than 7 characters entered',
            },
          })}
          type="password"
          placeholder="New Password"
        ></input>
        <div className="errors-info">{errors?.newPassword && <p>{errors?.newPassword?.message || 'Error!'}</p>}</div>

        {/*Avatar image */}
        <span>Avatar image (url)</span>
        <input
          className={errors?.avatarImage && 'form-invalid'}
          {...register('avatarImage', {
            pattern: {
              value: /[-a-zA-Z0-9@:%_\+.~#?&\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&\/=]*)?/gi,
              message: 'not valid url',
            },
            minLength: {
              value: 2,
              message: 'Less than 2 characters entered',
            },
          })}
          type="text"
          placeholder="Avatar image"
        ></input>
        <div className="errors-info">{errors?.avatarImage && <p>{errors?.avatarImage?.message || 'Error!'}</p>}</div>
      </div>
      <button type="submit" className="sign-up__button" disabled={!isValid}>
        send
      </button>
    </form>
  );
};

export default withRouter(EditProfile);
