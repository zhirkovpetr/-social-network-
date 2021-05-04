import React from "react";
import s from './Users.module.css'
import axios from "axios";
import userPhoto from '../../assets/images/user.png'
import {UsersPropsType} from "./UsersContainer";


class Users extends React.Component<UsersPropsType> {

    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
            this.props.setUsers(response.data.items)
        })
    }

    render() {
        return (<div>
            {this.props.usersPage.map(u => <div key={u.id}>
            <span>
                <div>
                    <img alt={'avatar'} className={s.photo} src={u.photos.small !== null ? u.photos.small : userPhoto}/>
                </div>
                <div>
                    {u.followed ? <button onClick={() => {
                            this.props.unFollow(u.id)
                        }}>UNFOLLOW</button> :
                        <button onClick={() => {
                            this.props.follow(u.id)
                        }}>FOLLOW</button>}
                </div>
            </span>
                    <span>
                <span>
                    <div>{u.name} {'u.surname'}</div>
                    <div>{u.status !== null ? u.status : 'not status'}</div>
                </span>
                <span>
                    <div>{'u.location.country'}</div>
                    <div>{'u.location.city'}</div>
                </span>
            </span>
                </div>
            )
            }
        </div>)
    }

}


export default Users;