import { useState,useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import '../index.css';

import { useRecoilValue, useSetRecoilState} from "recoil";

import { todoState,logState, usernameState, passwordState, nameState } from "../store/state";

function Update(){

    const navigate = useNavigate();
    const location = useLocation();

    const [task,setTask] = useState(location.state.task);
    const [description,setDescription] = useState(location.state.description);

    const todos = useRecoilValue(todoState);
    const setLog = useSetRecoilState(logState);

    function updateTodo(){
        fetch("https://todo-server-chi-weld.vercel.app/update/"+location.state.id,
        {
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer '+ localStorage.getItem('jwt'),
                'Accept' : 'application/json',
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
                'Access-Control-Allow-Headers' : 'Content-Type, Authorization'
            },
            body : JSON.stringify({
                "task" : task,
                "description" : description
            }),
            mode : 'cors'
        })
        .then((res)=> {
            return res.json();
        })
        .then((data)=> {
            alert(data.message);
            navigate('/');
        })
        .catch((err)=> {
            alert(err);
            console.log(err);
        })
    }

    useEffect(()=>{
            
    })


    return(
        <div>
            <div className="flex h-screen justify-center bg-gradient-to-r from-cyan-300 to-blue-300 ...">
                <div className="max-w-sm border border-black bg-white rounded-lg p-5 drop-shadow-2xl m-auto">    
                    <div className="space-y-4">
                        <div>
                            <input className="border border-black rounded-md p-2" type='text' placeholder='task' value={task} onChange={(e) => setTask(e.target.value)}></input>
                        </div>    
                        <div>
                            <input className="border border-black rounded-md p-2" type='text' placeholder='description' value={description} onChange={(e) => setDescription(e.target.value)}></input>
                        </div>
                        <div>
                            <button className="border p-2 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 ..." onClick={updateTodo}>update</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Update;