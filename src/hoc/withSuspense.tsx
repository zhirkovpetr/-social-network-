import React, {ComponentType} from "react";
import {Preloader} from "../common/Preloader/Preloader";


export function withSuspense<T>(Component: ComponentType<T>) {
    return (restProps: T) => {
    return <React.Suspense fallback={<Preloader/>}>
        <Component {...restProps}/>
    </React.Suspense>
}
}