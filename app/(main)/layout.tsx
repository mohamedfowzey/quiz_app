import { ReactNode } from "react";

export default function Main({children}:{children:ReactNode}){
    return (<>
    <h1>main layout</h1>
    {children}
    </>)
}