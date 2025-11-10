import { useState, useEffect } from "react";
const Accordion = ({ items }) => {
    const [activeIndex, setActiveIndex] = useState(-1);
    const handler = (index) => {
        setActiveIndex(index);
    }
    useEffect(()=>{
        console.log('initiating')
    },[])
    useEffect(()=>{
        console.log('changing')
    },[activeIndex])
    useEffect(()=>{
        console.log('unmounting')
    },[])
    return (
        <div>
            {items.map((item, index) => (
                <div key={index}>
                    <div onClick={() => handler(index)}>{item.title}</div>
                    {index === activeIndex && <div>{item.content}</div>}
                </div>

            ))}
        </div>
    );
}
export default Accordion;