/* eslint-disable semi */
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, withRouter } from 'react-router-dom';
import './forms.css';

const SignUp = ({ registeringNewUser, history }) => {
  const {
    register,
    watch,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    registeringNewUser(data);
    reset();
    history.push('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="app__sign-up sign-up">
      <span className="sign-up__title">Create new account</span>
      <div className="sign-up__inputs">
        {/*username*/}
        <span>Username</span>
        <input
          className={errors?.username && 'form-invalid'}
          {...register('username', {
            required: 'The field must be filled in',
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
            required: 'The field must be filled in',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
              message: 'not valid email',
            },
          })}
          placeholder="Email address"
          type="email"
        ></input>
        <div className="errors-info">{errors?.emailAddress && <p>{errors?.emailAddress?.message || 'Error!'}</p>}</div>

        {/*Password*/}
        <span>Password</span>

        <input
          className={errors?.password && 'form-invalid'}
          {...register('password', {
            required: 'The field must be filled in',
            minLength: {
              value: 7,
              message: 'Less than 7 characters entered',
            },
          })}
          type="password"
          placeholder="Password"
        ></input>
        <div className="errors-info">{errors?.password && <p>{errors?.password?.message || 'Error!'}</p>}</div>

        {/*Repeat Password*/}
        <span>Repeat Password</span>
        <input
          className={errors?.repeatPassword && 'form-invalid'}
          {...register('repeatPassword', {
            required: 'The field must be filled in',
            validate: (val) => {
              if (watch('password') != val) {
                return 'Your passwords do no match';
              }
            },
            minLength: {
              value: 7,
              message: 'Less than 7 characters entered',
            },
          })}
          type="password"
          placeholder="Repeat Password"
        ></input>
        <div className="errors-info">
          {errors?.repeatPassword && <p>{errors?.repeatPassword?.message || 'Error!'}</p>}
        </div>
      </div>

      <div className="sign-up__personal-information">
        <input required type="checkbox" />
        <span>I agree to the processing of my personal information</span>
      </div>
      <button type="submit" className="sign-up__button" disabled={!isValid}>
        send
      </button>

      <span className="sign-up__info">
        Already have an account? <Link to="/sign-in">Sign in</Link>.
      </span>
    </form>
  );
};

export default withRouter(SignUp);
