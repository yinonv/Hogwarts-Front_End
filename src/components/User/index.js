import React, { useContext } from 'react';
import './style.css'
import HogwartsContext from '../../context/HogwartsContext';
import { useHistory } from 'react-router-dom'

function User(props) {
    const { info } = props;
    const { name, lastName, id, existing } = info;
    const { setDisplayInfo } = useContext(HogwartsContext);
    const history = useHistory();
    const displayStudent = () => {
        setDisplayInfo(info)
        history.push('/student')
    }
    return (
        <tr onClick={(displayStudent)} className="students-row">
            <td>{id}</td>
            <td>{name}</td>
            <td>{lastName}</td>
            <td>{existing.map(exists => `${exists.skill}(${exists.level}), `)}</td>
        </tr>
    )
}

export default User;