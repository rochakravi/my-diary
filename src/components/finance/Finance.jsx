import { useState, useEffect, useCallback, Fragment } from 'react'
import styles from './Finance.module.scss'
import Progressbar from "../../Progress_bar";
import MyTable from '../../MyTable'
import GridExample from '../../ui-kit/grid/Grid';

import { Bar, Pie } from 'react-chartjs-2';
import Payer from '../payer/Payer';
import Button from '../../ui-kit/button/Button';
import AddFinance from './AddFinance.jsx/Addfinance';
const Finance = () => {

    const [finance, setFinance] = useState({
        "debitExpenseSum": 0,
        "debitExpenses": [],
        "creitExpenseSum": 0,
        "finance": [],
        "creditExpenses": [],
        "balance": 0,
        "progress": 0,

    })
    const [liabilities, setLiabilities] = useState([])
    const [dues, setDues] = useState([])
    const [goal, setGoal] = useState([])
    //const [liabilities, setLiabilities] = useState([])
    const [liability, setLiability] = useState({
        date: '',
        towards: '',
        amount: 0,
        status: 'upcoming'
    })
    const [total, setTotal] = useState(0)
    const barData = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const pieData = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    useEffect(() => {
        fetchFinance();
        fetchDues();
        fetchGoal();
    }, [])

    useEffect(() => {
        fetchFinance();
        calTotal();
    }, [liabilities])

    const fetchFinance = () => {
        fetch('http://localhost:8765/finance/finance')
            .then(res => res.json())
            .then(data => {
                setFinance(data);
            })
    }
    const calProgress = () => {
        setFinance(...finance, { progress: (finance.debitExpenseSum / finance.creitExpenseSum) * 100 })
    }
    const fetchDues = () => {
        // fetch('http://localhost:2000/dues')
        //     .then(res => res.json())
        //     .then(data => {
        //         setDues(data)
        //     })
    }

    const fetchGoal = () => {
        // fetch('http://localhost:2000/goal')
        //     .then(res => res.json())
        //     .then(data => {
        //         setGoal(data)
        //     })
    }
    const handler = (e) => {
        const { name, value } = e.target;
        setLiability({ ...liability, [name]: value })
    }

    const calTotal = () => {
        const val = liabilities.map(item => item.amount).reduce((prev, amount) => prev + JSON.parse(amount), 0)
        // const val = liabilities.reduce((a, b) => {
        //     return a + b.amount;
        // }, 0)
        setTotal(val);
    }

    const add = () => {

        // fetch('http://localhost:2000/liabilities', {
        //     method: 'POST',
        //     fields: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(liability)
        // }).then(
        //     fetchFinance()
        // )
    }


    const colDefs = [
        { field: 'date', filter: true, floatingFilter: true },
        { field: 'mode', filter: true, floatingFilter: true },
        { field: 'amount', filter: true, floatingFilter: true, editable: true },
        { field: 'purpose', filter: true, floatingFilter: true, editable: true },
        { field: 'category', filter: true, floatingFilter: true, editable: true },
        { field: 'status', filter: true, floatingFilter: true, editable: true },
    ];
    return (
        <>
            <div className={styles.headingPanel}>
                <div className={styles.card}>
                    <h3 className={styles.white}>Total debit</h3>
                    <div className={styles.expenseRatio}>
                        <h1 className={finance.debitExpenseSum > finance.creitExpenseSum ? styles.red : styles.white}>Rs. {finance.debitExpenseSum}</h1>
                        <h6> / Rs. {finance.creitExpenseSum}</h6>
                    </div>
                    <Progressbar
                        bgcolor="orange"
                        progress="30"
                        height={10}
                    />
                    <h6 className={styles.balance}>Balance Rs. {finance.balance}</h6>
                </div>
                <Payer />
            </div>
            <Button>Add</Button>
            <GridExample rows={finance.finance} columns={colDefs} />
            {/* <div>
                <h2>Bar Graph</h2>
                <Bar data={barData} />

                <h2>Pie Graph</h2>
                <Pie data={pieData} />
            </div> */}
            <AddFinance />
        </>
        // <div className='finance'>




        //     <div className='expectations'>
        //         <div>
        //             <h3>Liabilities</h3>
        //             <h5>
        //                 Total - {total}
        //             </h5>
        //         </div>

        //         <fieldset>
        //             <legend>Add Liability</legend>
        //             <div>
        //                 <label>Date</label>
        //                 <input name='date' value={liability.date} onChange={handler} type='date' />
        //             </div>
        //             <div>
        //                 <label>Towards</label>
        //                 <input name='towards' value={liability.towards} onChange={handler} />
        //             </div>
        //             <div>
        //                 <label>Amount</label>
        //                 <input name='amount' value={liability.amount} onChange={handler} />
        //             </div>
        //             <div>
        //                 <button onClick={add}>Add</button>
        //             </div>

        //         </fieldset>
        //         <table className='liability'>
        //             <thead>
        //                 <tr>
        //                     <th>Date</th>
        //                     <th>Towards</th>
        //                     <th>Amount</th>
        //                     <th>Status</th>
        //                 </tr>
        //             </thead>
        //             <tbody>
        //                 {liabilities.map((item, index) => {
        //                     return (
        //                         <Fragment key={item.id}>
        //                             <tr >
        //                                 <td>{item['date']}</td>
        //                                 <td>{item['towards']}</td>
        //                                 <td>Rs. {item['amount']}</td>
        //                                 <td>{item['status']}</td>
        //                             </tr>
        //                         </Fragment>
        //                     )
        //                 }

        //                 )}
        //             </tbody>
        //         </table>
        //     </div>
        //     <div className='dues'>
        //         <div>
        //             <h3>Dues</h3>
        //             <h5>
        //                 Total - {total}
        //             </h5>
        //         </div>

        //         <fieldset>
        //             <legend>Add Liability</legend>

        //             <div>
        //                 <label>Towards</label>
        //                 <input name='towards' value={liability.towards} onChange={handler} />
        //             </div>
        //             <div>
        //                 <label>Amount</label>
        //                 <input name='amount' value={liability.amount} onChange={handler} />
        //             </div>
        //             <div>
        //                 <button onClick={add}>Add</button>
        //             </div>

        //         </fieldset>
        //         <table className='liability'>
        //             <thead>
        //                 <tr>
        //                     <th>Receiver</th>
        //                     <th>Amount</th>
        //                     <th>Priority</th>
        //                 </tr>
        //             </thead>
        //             <tbody>
        //                 {dues.map((item, index) => {
        //                     return (
        //                         <Fragment key={item.id}>
        //                             <tr >
        //                                 <td>{item['receiver']}</td>
        //                                 <td>Rs. {item['amount']}</td>
        //                                 <td>{item['priority']}</td>
        //                             </tr>
        //                         </Fragment>
        //                     )
        //                 }

        //                 )}
        //             </tbody>
        //         </table>
        //     </div>

        //     <div className='goal'>
        //         <div>
        //             <h3>Goal</h3>
        //             <h5>
        //                 Total - {total}
        //             </h5>
        //         </div>

        //         <fieldset>
        //             <legend>Add Liability</legend>
        //             <div>
        //                 <label>Date</label>
        //                 <input name='date' value={liability.date} onChange={handler} type='date' />
        //             </div>
        //             <div>
        //                 <label>Towards</label>
        //                 <input name='towards' value={liability.towards} onChange={handler} />
        //             </div>
        //             <div>
        //                 <label>Amount</label>
        //                 <input name='amount' value={liability.amount} onChange={handler} />
        //             </div>
        //             <div>
        //                 <button onClick={add}>Add</button>
        //             </div>

        //         </fieldset>
        //         <table className='liability'>
        //             <thead>
        //                 <tr>
        //                     <th>Lender</th>
        //                     <th>Amount</th>
        //                     <th>Due Date</th>
        //                 </tr>
        //             </thead>
        //             <tbody>
        //                 {goal.map((item, index) => {
        //                     return (
        //                         <Fragment key={item.id}>
        //                             <tr >
        //                                 <td>{item['lender']}</td>
        //                                 <td>Rs. {item['amount']}</td>
        //                                 <td>{item['duedate']}</td>
        //                             </tr>
        //                         </Fragment>
        //                     )
        //                 }

        //                 )}
        //             </tbody>
        //         </table>
        //     </div>
        // </div >
    )
}
export default Finance;
