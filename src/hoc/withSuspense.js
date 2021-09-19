import React, {Suspense, lazy} from "react";

export const withSuspense = (Component)=> {
    return (
        <Suspense fallback={<div>Загрузка...</div>}>
            <Component />
        </Suspense>
    )
}