import './LoginForm.scss';
import React from 'react';
import { useFormik } from 'formik';

const LoginForm = () => {

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <div className='login__form__wrap'>
            <form onSubmit={formik.handleSubmit} className='login__formik'>
                <label htmlFor="email">Email Address</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default LoginForm;