/* eslint-disable semi */
import React from 'react';
import './forms.css';
import { useForm } from 'react-hook-form';
import { Link, withRouter } from 'react-router-dom';

const SignIn = ({ loginSystem, history }) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    loginSystem(data);
    reset();
    history.push('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="app__sign-in sign-in">
      <span className="sign-in__title">Sign In</span>
      <div className="sign-in__inputs">
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
      </div>
      <button type="submit" className="sign-up__button" disabled={!isValid}>
        send
      </button>
      <span className="sign-in__info">
        Don’t have an account? <Link to="/sign-up">Sign Up</Link>.
      </span>
    </form>
  );
};

export default withRouter(SignIn);
