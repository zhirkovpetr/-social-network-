import React from 'react';
import s from '../../components/Users/Users.module.css'

type paginatorPropsType= {
    onPageChanged: (pageNumber: number) => void
    currentPage: number
    totalUsersCount: number
    pageSize: number
}

export const Paginator = React.memo((props: paginatorPropsType) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = [] as Array<number>
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
     return (
        <div className={s.page}>
            {pages.map((p) => {
                return <span onClick={() => {
                    props.onPageChanged(p)
                }} className={props.currentPage === p ? s.selectedPage : ''}>{p}</span>
            })}
        </div>
     )
})
