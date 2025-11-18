import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Eye, EyeOff } from 'lucide-react';
import './Login.scss';

interface LoginFormValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object<LoginFormValues>({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (_values, { setSubmitting }) => {
      // simulate 2s API call
      setTimeout(() => {
        setSubmitting(false);
        navigate('/dashboard');
      }, 2000);
    },
  });

  const isDisabled = !formik.isValid || !formik.dirty || formik.isSubmitting;

  return (
    <div className="login-page">
      {/* LEFT SIDE: logo + illustration (same as Figma) */}
      <div className="login-left">
        <img className="login-logo" src="/lendsqr-logo.svg" alt="Lendsqr" />

        <img
          className="login-illustration"
          src="/login-illustration.svg"
          alt="Person walking through door"
        />
      </div>

      {/* RIGHT SIDE: form */}
      <div className="login-right">
        <div className="login-form">
          <h1 className="login-title">Welcome.</h1>
          <p className="login-subtitle">Enter details to login.</p>

          <form onSubmit={formik.handleSubmit} noValidate>
            {/* EMAIL */}
            <div className="form-group">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={formik.isSubmitting}
                className={
                  formik.touched.email && formik.errors.email
                    ? 'input-field input-error'
                    : 'input-field'
                }
              />
              {formik.touched.email && formik.errors.email && (
                <p className="field-error">{formik.errors.email}</p>
              )}
            </div>

            {/* PASSWORD + TOGGLE */}
            <div className="form-group">
              <div
                className={
                  formik.touched.password && formik.errors.password
                    ? 'password-field input-error'
                    : 'password-field'
                }
              >
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={formik.isSubmitting}
                  className="input-field password-input"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((prev) => !prev)}
                  disabled={formik.isSubmitting}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="field-error">{formik.errors.password}</p>
              )}
            </div>

            {/* FORGOT PASSWORD */}
            <div className="forgot-password">
              <button type="button" className="forgot-link">
                FORGOT PASSWORD?
              </button>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="login-button"
              disabled={isDisabled}
            >
              {formik.isSubmitting ? 'LOGGING IN…' : 'LOG IN'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
