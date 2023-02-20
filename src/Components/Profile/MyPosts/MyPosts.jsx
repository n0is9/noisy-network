//DIMYCH
import React from 'react';
import Post from "./Post/Post";
import styles from './MyPosts.module.css';
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";


const maxLength10 = maxLengthCreator(10);


const AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name={'newPostText'} placeholder={'Enter your post'}
                       validate={[required, maxLength10]}/>
            </div>
            <div>
                <button>Post</button>
            </div>
        </form>
    )
}
const AddNewPostFormRedux = reduxForm({form: 'ProfileAddNewPostForm'})(AddNewPostForm)

const MyPosts = React.memo (props => {
    let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount} id={p.id}/>);

    let newPostElement = React.createRef()

    let onAddPost = (values) => {
        props.addPost(values.newPostText);
    }

    return (
        <div className={styles.postsBlock}>
            <h3>My posts</h3>
            <AddNewPostFormRedux onSubmit={onAddPost}/>
            <div className={styles.posts}>
                {postsElements}
            </div>
        </div>
    )
});

export default MyPosts;

//REACT-FINAL-FORM
//import {Form} from "react-final-form";
// const AddNewPostForm = props => {
//     return (
//         <Form
//             initialValues={{
//                 newPostText: ''
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
//                         <Field placeholder={'your post'} name={'newPostText'} component={'input'} type={'text'}/>
//                     </div>
//                     <div>
//                         <button type="submit" disabled={submitting}>
//                             Post
//                         </button>
//                     </div>
//
//                 </form>
//             )}
//         </Form>
//     )
// }
// const MyPosts = (props) => {
//     let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount} id={p.id}/>);
//
//     let newPostElement = React.createRef()
//
//     let onAddPost = (initialValues) => {
//         props.addPost(initialValues.newPostText);
//     }
//
//     return (
//         <div className={classes.postsBlock}>
//             <h3>My posts</h3>
//             <AddNewPostForm onSubmit={onAddPost}/>
//             <div className={classes.posts}>
//                 {postsElements}
//             </div>
//         </div>
//     )
// }
// export default MyPosts


// REACT-HOOK-FORM
//import {useForm} from "react-hook-form";

// const AddNewPostForm = (props) => {
//     const { register, handleSubmit, setValue  } = useForm({
//         defaultValues: {
//             newPostText: ''
//         }
//     });
//     const onSubmit = data => console.log(data);
//
//     return (
//         <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete={'off'}>
//             <div>
//                 <textarea {...register("newPostText")} placeholder={'your post'}/>
//             </div>
//             <div>
//                 <button type={'submit'}>Post</button>
//             </div>
//
//         </form>
//     );
//
// const MyPosts = (props) => {
//     let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount} id={p.id}/>);
//
//     let newPostElement = React.createRef()
//
//     let onAddPost = (values) => {
//         props.addPost(values.newPostText);
//     }
//
//     return (
//         <div className={classes.postsBlock}>
//             <h3>My posts</h3>
//             <AddNewPostForm onSubmit={onAddPost}/>
//             <div className={classes.posts}>
//                 {postsElements}
//             </div>
//         </div>
//     )
// }
//
// export default MyPosts;






