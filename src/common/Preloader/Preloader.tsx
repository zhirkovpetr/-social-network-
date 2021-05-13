import React from 'react';
import loading from '../../assets/images/loading.svg'

export const Preloader = () => {
    return (<div>
        <img alt={'LOADING, PLEASE WAIT'} src={loading} />
    </div>)
}