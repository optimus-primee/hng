import { useState } from 'react';
import styles from './Signin.module.scss';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import spiderman from '../../assets/judeus-samson-rAomxXulMNM-unsplash.jpg';
import { auth } from '../../../firebase';

const Signin = () => {
  const navigate = useNavigate();
  const [errorState, setErrorState] = useState(null); // Change errorState to null initially

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    }),
    onSubmit: (values) => {
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          if (userCredential.user.email) {
            navigate('/image');
          }
        })
        .catch((error) => {
          setErrorState(error.message);
          console.log(error);
          navigate('/');
        });
    },
  });

  return (
    <section className={styles.signupWrapper}>
      <img src={spiderman} />
      <form onSubmit={formik.handleSubmit}>
        <h1>Sign In</h1>
        {errorState && <small>{errorState}</small>}
        <div className={styles.signupForm}>
          <label htmlFor='email'>
            Email
            <input
              name='email'
              type='email'
              placeholder='Enter your email'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <small className={styles.error}>{formik.errors.email}</small>
            ) : null}
          </label>
          <label htmlFor='password'>
            Password
            <input
              name='password'
              type='password'
              placeholder='Enter your password'
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <small className={styles.error}>{formik.errors.password}</small>
            ) : null}
          </label>
          <div className=''>
            <button type='submit'>Sign In</button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Signin;
