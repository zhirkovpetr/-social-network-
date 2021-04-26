import React from "react";
import {FriendsPropsType} from "./FriendsContainer";
import s from './Friends.module.css'
import {v1} from "uuid";


const Friends = (props: FriendsPropsType) => {
    if(props.friends.friends.length === 0) {
        props.setFriends(
            [{
                id: v1(),
                img: "https://dthezntil550i.cloudfront.net/kg/latest/kg1802132010216500004834729/1280_960/557d644f-12f3-49e1-bb66-23c16400540d.png",
                follow: true,
                name: 'Dmitry',
                surname: 'Prokopovich',
                status: 'I am looking jop right now',
                location: {country: 'Belarus', city: 'Minsk'}
            },
                {
                    id: v1(),
                    img: "https://dthezntil550i.cloudfront.net/kg/latest/kg1802132010216500004834729/1280_960/557d644f-12f3-49e1-bb66-23c16400540d.png",
                    follow: false,
                    name: 'Petr',
                    surname: 'Zhirkov',
                    status: 'I am looking football',
                    location: {country: 'Ukraine', city: 'Kiev'}
                },
                {
                    id: v1(),
                    img: "https://dthezntil550i.cloudfront.net/kg/latest/kg1802132010216500004834729/1280_960/557d644f-12f3-49e1-bb66-23c16400540d.png",
                    follow: true,
                    name: 'Alena',
                    surname: 'Kostuk',
                    status: 'I am like cat',
                    location: {country: 'Russia', city: 'Moscow'}
                },
                {
                    id: v1(),
                    img: "https://dthezntil550i.cloudfront.net/kg/latest/kg1802132010216500004834729/1280_960/557d644f-12f3-49e1-bb66-23c16400540d.png",
                    follow: false,
                    name: 'Nastia',
                    surname: 'Shavikova',
                    status: 'I am eat right now',
                    location: {country: 'Russia', city: 'Saratov'}
                }
            ]
        )
    }

    return (<div>
        {props.friends.friends.map(u => <div key={u.id}>
            <span>
                <div>
                    <img alt={'avatar'} className={s.photo} src={u.img}/>
                </div>
                <div>
                    {u.follow ?  <button onClick={()=>{props.unFollow(u.id)}}>UNFOLLOW</button> :
                        <button onClick={()=>{props.follow(u.id)}}>FOLLOW</button>}
                </div>
            </span>
                <span>
                <span>
                    <div>{u.name} {u.surname}</div>
                    <div>{u.status}</div>
                </span>
                <span>
                    <div>{u.location.country}</div>
                    <div>{u.location.city}</div>
                </span>
            </span>
            </div>
        )
        }
    </div>)
}


export default Friends;