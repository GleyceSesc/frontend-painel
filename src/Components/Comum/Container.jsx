import React from "react"
export default function Container({...props}) {
    return (
        <div className="container-fluid">
            <div className="row">
            {React.cloneElement(props.children, { ...props })}
            </div>
        </div>
    )
}