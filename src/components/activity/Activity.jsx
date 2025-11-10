import { useState, useEffect } from "react";
//import { ErrorBoundary } from "react-error-boundary";
import UilReact from '@iconscout/react-unicons/icons/uil-react'
import { FaRegCheckCircle } from 'react-icons/fa';
import styles from "./Activity.module.scss"
import Button from "../../ui-kit/button/Button";

const Activity = () => {
    const [activities, setActivities] = useState([]);
    const [activity, setActivity] = useState({
        name: '',
        status: false
    })
    const handle = (e) => {
        const { name, value } = e.target;
        setActivity({ name: value, status: false })
    }
    const add = () => {
        // fetch("http://localhost:2000/activities", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({ activity })
        // }).then(
        //     fetchData()
        // );
    }

    const fetchData = () => {
        // fetch("http://localhost:2000/activities")
        //     .then(res => res.json())
        //     .then(data => {
        //         setActivities(data)
        //     })
        //     .catch(error => {
        //         console.log('Get call failed')
        //         throw (error);
        //     })
    }

    useEffect(() => {
        fetchData();
    }, [])

    const updateStatus = (key) => {
        // const payload = { name: 'll', status: true }
        // fetch("http://localhost:2000/activities/:" + key, {
        //     method: "PUT",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(payload)
        // }).then(
        //     fetchData()
        // ).catch(error => console.log(error));

    }
    return (<>
        <h6>Activity</h6>
        <div>
            <fieldset>
                <legend className={styles.legend}>
                    Add Activity
                </legend>
                <input className={styles.input} value={activity.name} onChange={handle} />
                <button onClick={add}>Add</button>
                <Button>Test</Button>
                <Button variant='primary'>Primary</Button>
                <Button variant='secondary'>Secondary</Button>
                <Button variant='outline'>Outline</Button>
            </fieldset>
        </div>
        <div>
            {activities.map((item, index) => (
                <li key={index}>
                    <p>{item['activity']['name']}</p>
                    <span><FaRegCheckCircle size="20" color="#61DAFB" onClick={() => updateStatus(index)} /></span>
                </li>
            ))}
        </div>
    </>
    )
}
export default Activity;
