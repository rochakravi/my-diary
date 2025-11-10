import ErrorMessage from '../errorMessage/ErrorMessage'
const InputField = ({ label, name, value, handler, errorMessage }) => {
    const handleClick = (e) => {
        handler(e)
    }
    return (
        <div className='field-box'>
            <div>
                <label>{label}</label>
                <input name={name} type='text' value={value} onChange={(e) => handleClick(e)} />
            </div>
            <div><ErrorMessage errMessage={errorMessage} /></div>
        </div>
    )
}
export default InputField;