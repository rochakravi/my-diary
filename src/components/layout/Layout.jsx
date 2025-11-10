import { Outlet, Link } from "react-router-dom";
import './Layout.scss'

const Layout = () => {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/activity">Activities</Link>
                    </li>
                    <li>
                        <Link to="/finance">Finance</Link>
                    </li>
                    <li>
                        <Link to="/learning">Learning</Link>
                    </li>


                </ul>
            </nav>

            <Outlet />
            <footer style={{ background: 'red', padding: '15px', borderRadius: '4px' }}> I am footer and I will stick to the bottom of screen</footer>
        </>
    )
};

export default Layout;