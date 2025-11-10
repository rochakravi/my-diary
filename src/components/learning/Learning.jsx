import { Outlet, Link } from "react-router-dom";
import Box from '../../ui-kit/box/Box';
import './Learning.scss'
const Learning = () => {


    return (
        <>
            <div className='topic'>

                <Link to="/learning/java"><Box title="Java" /></Link>
                <Link to="/learning/microservices"><Box title="Microservies" /></Link>
                <Box title="Angular" />
                <Box title="React" />
                <Box title="AWS" />
                <Box title="Misleneous" />
            </div>
            <Outlet />
        </>
    )

}
export default Learning;
