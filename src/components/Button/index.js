import React from 'react'
import './style.css'

function Button(props) {
    const { text, onClick, color } = props
    return <button onClick={onClick} className={`button ${color}`}>{text}</button>
}

export default Button;