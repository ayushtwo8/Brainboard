import axios from "axios";
import { useState } from "react";

const Signup = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const backendUrl = "http://localhost:5000/api/v1";

    const handleSignup = async () => {
        try{
            setLoading(true);
            const res = await axios.post(`${backendUrl}/user/signup`,{
                name, email, password
            })
            if(res.status == 201){
                console.log("Signed up successfully");
            }
            
        }catch(error: any){
            setError(error)

        }finally{
            setLoading(false);
        }
    }

    if(loading){
        return<>
            <div>
                Loading...
            </div>
        </>
    }

    return<>
        <h1 className="font-bold text-2xl">Register</h1>
        <div >
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="name" className="border-1 rounded-md p-1 text-lg m-2" />
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="email" className="border-1 rounded-md p-1 text-lg m-2" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" placeholder="password" className="border-1 rounded-md p-1 text-lg m-2" />
        </div>
        <button onClick={handleSignup} className="bg-blue-500 border-1 border-blue-500 rounded-xl p-2 text-lg font-bold text-white hover:bg-blue-600">Signup</button>

        {error && (
            <div className="font-bold">
                {error}
            </div>
        )}
    </>
}

export default Signup;