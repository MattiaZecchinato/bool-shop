
import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Menu from "../components/Menu"

function MainLayout() {

    return <>
        <Header />
        <Menu />
        <main className="container">
            <Outlet />
        </main>
        <Footer />
    </>
}

export default MainLayout