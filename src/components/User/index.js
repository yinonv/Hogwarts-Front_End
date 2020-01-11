import React, { useContext, useEffect } from 'react';
import './style.css'
import HogwartsContext from '../../context/HogwartsContext';
import { useHistory } from 'react-router-dom'
import { getCourses } from '../../lib/api';

function User(props) {
    const { info } = props;
    const { name, lastName, id, existing, desired, courses, createDate } = info;
    const update = useContext(HogwartsContext);
    const history = useHistory();
    const displayStudent = () => {
        update(info)
        history.push('/student')
    }
    return (
        <tr onClick={(displayStudent)} className="students-row">
            <td>{id}</td>
            <td>{name}</td>
            <td>{lastName}</td>
            <td>{existing.map(exists => `${exists.skill}(${exists.level}), `)}</td>
            {/* <td>{desired.map(desired => `${desired.skill}(${desired.level}) `)}</td>
            <td>{courses.map(course => course)}</td>
            <td>{`${createDate.date} - ${createDate.time}`}</td> */}
        </tr>
    )
}

export default User;