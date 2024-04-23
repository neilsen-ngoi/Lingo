import { MobileHeader } from "@/components/mobile-header"
import { Sidebar } from "@/components/sidebar"

type Props = {
    children: React.ReactNode
}

const MainLayout = ({children}:Props) => {
    return (
        <>
            <MobileHeader/>
            <Sidebar className=" hidden lg:flex"/>
            <main className=" lg:pl-[256px] h-full pt-[50px] lg:pt-0">
                <div>
                    {children}
                </div>
            </main>
        </>
    )
}

export default MainLayout