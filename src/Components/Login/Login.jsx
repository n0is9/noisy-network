//FINAL-FORM
// import React from 'react'
// import {Form, Field} from 'react-final-form'

// const LoginForm = props => {
//     return (
//         <Form
//             initialValues={{
//                 login: '',
//                 password: '',
//                 rememberMe: false
//             }}
//             onSubmit={values => {
//                 // send values to the cloud
//             }}
//             validate={values => {
//                 // do validation here, and return errors object
//             }}>
//             {({handleSubmit, pristine, form, submitting}) => (
//                 <form onSubmit={handleSubmit}>
//
//                     <div>
//                         <Field placeholder={'Login'} name={'login'} component={'input'} type={'text'}/>
//                     </div>
//                     <div>
//                         <Field placeholder={'Password'} name={'password'} component={'input'} type={'password'}/>
//                     </div>
//                     <div>
//                         <Field component={'input'} name={'rememberMe'} type={'checkBox'}/> Remember me
//                     </div>
//                     <div>
//                         <button type="submit" disabled={submitting}>
//                             Submit
//                         </button>
//                         <button
//                             type="button"
//                             disabled={pristine || submitting}
//                             onClick={form.reset}
//                         >
//                             Clear Values
//                         </button>
//                     </div>
//
//                 </form>
//             )}
//         </Form>
//     )
// }
// export default LoginForm


//HOOK-FORM
// import {useForm} from "react-hook-form";
//
// const requiredForLogin = {
//     required: 'email is '
// };
// const requiredForPassword = {
//     required: true,
//     minLength: 6,
//     maxLength: 18
// };
//
//
// const Login = () => {
//     const { register, handleSubmit, formState: { errors }  } = useForm({
//         values: {
//             login: '',
//             password: '',
//             rememberMe: false
//         }
//     });
//     const onSubmit = data => console.log(data);
//
//     return (
//         <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete={'off'}>
//             <h1>LOGIN</h1>
//             <div>
//                 <input type={'login'} {...register("login", requiredForLogin)} placeholder={'Login'}/>
//             </div>
//             <div>
//                 <input type={'password'} {...register("password", requiredForPassword)} placeholder={'Password'}/>
//             </div>
//             <div>
//                 <input type={'checkbox'} {...register("rememberMe")} /> Remember me
//             </div>
//             <div>
//             <button>Login</button>
//             </div>
//
//         </form>
//     );
// }
// export default Login

//HOOK-FORM BY GPT
// import {connect} from "react-redux";
// import {LoginTC} from "../../redux/auth-reducer";
// import {useForm} from "react-hook-form";
// import {Navigate} from "react-router-dom";
//
// const LoginForm = (props) => {
//     const { handleSubmit, register, errors } = useForm();
//     const onSubmit = (data) => {
//         props.login(data.email, data.password, data.rememberMe);
//     };
//
//     return (
//         <form onSubmit={handleSubmit(onSubmit)}>
//             <div>
//                 <input
//                     placeholder="Email"
//                     name="email"
//                     ref={register({ required: true })}
//                 />
//                 {errors.email && <span>This field is required</span>}
//             </div>
//             <div>
//                 <input
//                     placeholder="Password"
//                     name="password"
//                     type="password"
//                     ref={register({ required: true })}
//                 />
//                 {errors.password && <span>This field is required</span>}
//             </div>
//             <div>
//                 <input name="rememberMe" type="checkbox" ref={register} /> Remember me
//             </div>
//             <div>
//                 <button type="submit">Login</button>
//             </div>
//         </form>
//     );
// };
//
// const Login = (props) => {
//     if (props.isAuth) return <Navigate to="/profile"/>;
//     return (
//         <div>
//             <h1>LOGIN</h1>
//             <LoginForm />
//         </div>
//     );
// };
//
// const mapStateToProps = (state) => ({
//     isAuth: state.auth.isAuth
// });
//
// export default connect(mapStateToProps, { login: LoginTC })(Login);


//DIMYCH
import React from "react";
import {Field, reduxForm} from "redux-form";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {LoginTC} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";
import styles from '../common/FormsControls/FormsControls.module.css'


const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>

                {createField('Email', 'email', [required], Input)}
                {/*<Field placeholder={'Email'}*/}
                {/*       validate={[required]}*/}
                {/*       name={'email'}*/}
                {/*       component={Input}/>*/}
                {createField('Password', 'password', [required], Input, {type:'password'})}
                {/*<Field placeholder={'Password'}
                       validate={[required]}
                       name={'password'}
                       type={'password'}
                       component={Input}/>*/}
                {createField(null, 'rememberMe', [], Input, {type:'checkBox'}, 'Remember me')}
                {/*<Field component={Input} */}
                {/*       name={'rememberMe'} */}
                {/*       type={'checkBox'}/> Remember me*/}
            {
                props.error && <div className={styles.formSummaryError}>
                    {props.error}
                </div>
            }
            <div>
                <button>
                    Login
                </button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }
    if (props.isAuth) return <Navigate to="/profile"/>;
    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>

    )
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login: LoginTC})(Login)