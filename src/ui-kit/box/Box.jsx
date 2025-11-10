import './Box.scss'
const Box = ({ title }) => {
    return (
        <div className='card'>
            <header class='header'>{title}</header>
        </div>
    )
}
export default Box;
