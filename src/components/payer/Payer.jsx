import './Payer.scss'
const Payer = () => {
    return (
        <ul className='lender-list'>
            <li className='person'>
                <span>Name</span>
                <span>Amount</span>
                <span>Due Date</span>
                <span>Date</span>
            </li>
            <li className='person'>
                <span>Dr. Ravi Tiwari</span>
                <span>6000</span>
                <span>2nd March - 10</span>
                <span>June 2023</span>
            </li>
            <li className='person'>
                <span>Nitish</span>
                <span>2000</span>
                <span>4th March</span>
                <span>June 2023</span>
            </li>
            <li className='person'>
                <span>Sonu</span>
                <span>3000</span>
                <span>2nd March - 10</span>
                <span>June 2023</span>
            </li>
            <li className='person'>
                <span>Madhu Bhaiya</span>
                <span>10000</span>
                <span>2nd March - 10</span>
                <span>June 2023</span>
            </li>
        </ul>
    )
}

export default Payer;