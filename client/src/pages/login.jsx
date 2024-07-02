import { useEffect , useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { useRecoilState, useSetRecoilState } from "recoil";
import '../index.css';

import { usernameState,passwordState,logState } from "../store/state";

function Login(){

    const [username,setUsername] = useRecoilState(usernameState);
    const [password,setPassword] = useRecoilState(passwordState);
    const setLog = useSetRecoilState(logState);

    const navigate = useNavigate();

    async function login(){
        fetch("https://todo-server-chi-weld.vercel.app/login",
        {
            method : 'POST',
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({
                "username" : username,
                "password" : password,
            })
        })
        .then((res)=>{
            return res.json();
        })
        .then((data) =>{
            const token = data.token;
            localStorage.setItem('jwt',token);
            setLog(true);
            setUsername("");
            setPassword("");
            alert(data.message);
            navigate('/');
        })
        .catch((err)=>{
            setUsername("");
            setPassword("");
            console.log(err); 
            alert(err);
        })
    }

    useEffect(()=>{
        
    },[]);

    return(
        <div className="flex h-screen justify-center bg-gradient-to-r from-cyan-300 to-blue-300 ...">
            <div className="max-w-sm border border-black bg-white rounded-lg p-5 drop-shadow-2xl m-auto">    
                <div className="space-y-4">
                    <div className="font-bold text-lg">
                        Login to our platform
                    </div>
                    <div>
                        <input className="border border-black rounded-md p-2" placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)}></input>
                    </div>    
                    <div>
                        <input className="border border-black rounded-md p-2" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    </div>
                    <div>
                        <button className="border p-2 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 ..." onClick={login}>Login</button>
                    </div>
                    <div>
                        new here? <Link className="border p-2 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 ..." to='/signup'>SignUp</Link>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Login;
