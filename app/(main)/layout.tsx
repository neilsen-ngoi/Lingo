import { Sidebar } from "@/components/sidebar"

type Props = {
    children: React.ReactNode
}

const MainLayout = ({children}:Props) => {
    return (
        <>
            <Sidebar className=" hidden lg:flex"/>
            <main className=" lg:pl-[256px] h-full">
                <div>
                    {children}
                </div>
            </main>
        </>
    )
}

export default MainLayout