import React from 'react';
import './style.css'

function UserData(props) {
    const { title, dataArray, callback } = props;
    return (
        <div className="data-wrapper">
            <div className="data-title">{title}</div>
            <div className="data-span-wrapper">
                {title != "Courses: " && dataArray.map((skill, i) => (
                    <span key={i} className="selected"
                        onClick={(e) => callback(e, i)}>{`${skill.skill}(${skill.level}) `}</span>
                ))}
                {title == "Courses: " && dataArray.map((course, i) => (
                    <span key={i} className="selected"
                    onClick={(e) => callback(e, i)}>{course}</span>
                ))}
            </div>
        </div>
    )
}

export default UserData;