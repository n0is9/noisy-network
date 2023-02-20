import React from 'react';
import classes from './Post.module.css';

const Post = (props) => {
    return (
        <div className={classes.item}>
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3MckZuLGiK5NEtLYP_k-gd7MDLg5FTlauIBkkjqcEKbxgjPl3_rH_Fwil44cqc-Vc_IE&usqp=CAU"
                alt=""/>
            {props.message}
            <div>
                <span>Like </span>{props.likesCount}
            </div>
        </div>
    )
}
export default Post;