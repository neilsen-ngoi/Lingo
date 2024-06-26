import { Button } from "@/components/ui/button"

const ButtonsPage = () => {
    return (
        <div className=" p-4 space-y-4 flex flex-col max-w-[200px]">
            <Button>Defualt</Button>
            <Button variant='primary'>Primary</Button>
            <Button variant='primaryOutline'>Primary outline</Button>
            <Button variant='secondary'>secondary</Button>
            <Button variant='secondaryOutline'>secondary outline</Button>
            <Button variant='danger'>danger</Button>
            <Button variant='dangerOutline'>danger outline</Button>
            <Button variant='premium'>premium</Button>
            <Button variant='premiumOutline'>premium outline</Button>
            <Button variant='ghost'>ghost</Button>
            <Button variant='sidebar'>sidebar</Button>
            <Button variant='sidebarOutline'>sidebar outline</Button>
        </div>
    )
}

export default ButtonsPage