import { Outlet } from "react-router-dom"
import { Footer, Navbar } from "../index"
const Layout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}
export default Layout