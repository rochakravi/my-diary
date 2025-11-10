import React, { useState } from 'react'
import Button from '../../../ui-kit/button/Button';
import styles from './AddFinance.module.scss'
import axios from 'axios';
const AddFinance = () => {
    const [finance, setFinance] = useState({
        id: '',
        date: '',
        mode: '',
        amount: 0,
        purpose: '',
        category: '',
        status: ''
    });
    const [selectedMode, setSelectedMode] = useState('');
    const add = async () => {
        console.log('finance =>', finance)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(finance)
        };
        try {
            console.log('finace payload =>', finance);
            axios.post('https://localhost:8765/finance/add-finance', finance)
                .then(res => console.log(res.data))
                .catch(err => console.error(err))
            //const response = await axios.('http://localhost:8765/finance/finance', finance);
            //console.log(response.data);
        } catch (error) {
            console.error(error);
        }

        // fetch('http://localhost:8765/finance/finance', requestOptions)
        //     .then(response => response.json())
        //     .then(data => console.log('data =>', data))
        //     .catch(error => console.log('error =>', error))

        console.log('testing')
    }


    const handler = (event) => {
        const { name, value } = event.target
        setFinance({ ...finance, [name]: value })
        console.log('finance =>', finance)
    }

    return (
        <div className={styles.panel}>
            <form className={styles.form}>
                <div className={styles.field}>
                    <label className={styles.label}> date</label>
                    <input type='date' name='date' className={styles.input} value={finance.date} onChange={handler} />
                </div>
                <div className={styles.field}>
                    <label className={styles.label}> mode</label>
                    <select className={styles.input} name='mode' value={finance.mode} onChange={handler}>
                        <option value=''>Select mode</option>
                        <option value='credit'>Credit</option>
                        <option value='debit'>Debit</option>
                    </select>
                </div>
                <div className={styles.field}>
                    <label className={styles.label}> amount</label>
                    <input type='number' name='amount' value={finance.amount} className={styles.input} onChange={handler} />
                </div>
                <div className={styles.field}>
                    <label className={styles.label}> purpose</label>
                    {/* <input type='textarea' /> */}
                    <textarea name='purpose' value={finance.purpose} className={styles.input} onChange={handler} />
                </div>
                <div className={styles.field}>
                    <label className={styles.label}> category</label>
                    <input name='category' value={finance.category} className={styles.input} onChange={handler} />
                </div>
                <div className={styles.field}>
                    <label className={styles.label}> Status</label>
                    <select className={styles.input} name='status' value={finance.status} onChange={handler}>
                        <option value=''>Select status</option>
                        <option value='proposed'>Proposed</option>
                        <option value='approved'>Approved</option>
                        <option value='funded'>Funded</option>
                        <option value='paid'>Paid</option>
                    </select>
                </div>
                <div className={styles.field}>
                    <Button onClick={add}>Add</Button>
                </div>
            </form>
        </div>
    )
}
export default AddFinance;
