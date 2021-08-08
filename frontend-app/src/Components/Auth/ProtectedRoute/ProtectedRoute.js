
import { useEffect } from "react";

import { Redirect, Route } from 'react-router-dom';

export default function ProtectedRoute({authState, redirectPath, children, ...rest}){
    return(
        <Route {...rest} render={({location})=>
            authState ? (children) : (<Redirect to={{
                pathname: redirectPath,
                state: { from : location}
            }}/>)
        }/>
    )
}
