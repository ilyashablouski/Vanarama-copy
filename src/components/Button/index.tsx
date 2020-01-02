import React from "react"


const Button = ({size, color, label}) => {
    return (<button className="button">{label}<span className="icon"></span></button>);
}

export default Button