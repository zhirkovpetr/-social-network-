import {AddPost, initialStateType, onKeyPressHandler, postsType} from '../../../redux/profile-reducer';
import {AppStateType} from '../../../redux/redux-store';
import {connect} from 'react-redux';
import {MyPosts} from './MyPosts';

export type profilePageType = {
    posts: Array<postsType>
}

type mapStatePropsType = {
    profilePage: initialStateType
}

let mapToStateToProps = (state: AppStateType): mapStatePropsType => {
    return {
        profilePage: state.profilePage
    }
}

export const MyPostsContainer = connect(mapToStateToProps, {AddPost, onKeyPressHandler})(MyPosts)

