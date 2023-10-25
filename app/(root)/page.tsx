import { UserButton } from "@clerk/nextjs";

export default function Home() {
    return (
        <div>
            <h1>Page Root</h1>
            <UserButton afterSignOutUrl="/"/>
        </div>
    )
}