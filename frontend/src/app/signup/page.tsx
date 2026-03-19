import SignUp from "@/components/SignUp";
import Link from "next/link";

export default function Page() {
    return (
        <div className="bg-gradient-to-t from-[#cdbba5] justify-center text-white text-center to-[#561C24] py-12 px-4">
            <Link href={'/login'} className="hover:underline">Already have an account ?</Link>
            <div className="max-w-md mx-auto bg-[#561C24] rounded-xl shadow-2xl overflow-hidden">
                <div className="bg-[#dfcbb3] border-[#561C24] py-6 px-8">
                    <h1 className="text-3xl font-bold text-[#561C24] text-center">Create Account</h1>
                </div>
                <div className="py-8">
                    <SignUp />
                </div>
            </div>
        </div>        
    )
}