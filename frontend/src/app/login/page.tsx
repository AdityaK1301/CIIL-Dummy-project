import Login from "@/components/Login";

export default function Page() {
    return (
        <div className="bg-gradient-to-t from-[#cdbba5] text-white to-[#561C24] py-24 px-4">
            <div className="max-w-md mx-auto bg-[#561C24] rounded-xl shadow-2xl overflow-hidden">
                <div className="bg-[#dfcbb3] border-[#561C24] py-6 px-8">
                    <h1 className="text-3xl font-bold text-[#561C24] text-center">Login</h1>
                </div>
                <div className="p-8">
                    <Login />
                </div>
            </div>
        </div>        
    )
}