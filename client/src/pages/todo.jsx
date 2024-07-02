import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { todoState,logState, filterAtom, filterSelector, toggleAtom, usernameState, nameState, passwordState} from "../store/state";

function Todo(){

    const [todos,setTodos] = useRecoilState(todoState);
    const [log,setLog] = useRecoilState(logState);
    const [filter,setFilter] = useRecoilState(filterAtom);
    const filteredTodos = useRecoilValue(filterSelector);
    const [toggle,setToggle] = useRecoilState(toggleAtom);

    const [task,setTask] = useState("");
    const [description,setDescription] = useState("");

    const navigate = useNavigate();

    async function getTodos(){

        fetch("https://todo-server-chi-weld.vercel.app",
        {
            method : 'GET',
            headers : {
                'Accept' : 'application/json',
                'content-type' : 'application/json',
                'Authorization' : 'Bearer '+localStorage.getItem('jwt')
            }
        })
        .then((res)=>{
            return res.json();
        })
        .then((data)=>{
            setLog(true);
            setTodos(data);
        })
        .catch((err)=>{
            console.log(err);
            alert(err);
        })
    }

    useEffect(()=> {
        if(log)
        {
            getTodos();
        }
    },[]);


    function addTodo(){
        fetch('https://todo-server-chi-weld.vercel.app/add',
        {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer '+ localStorage.getItem('jwt'),
                'Accept' : 'application/json'
            },
            body : JSON.stringify({
                "task" : task,
                "description" : description
            })
        })
        .then((res)=>{
            return res.json();
        })
        .then((data)=>{
            alert(data.message);
            setTask("");
            setDescription("");
            getTodos();
        })
        .catch((err)=>{
            alert(err);
            console.log(err);
        })
    }

    function filterTodos(){
        setToggle(true);
    }

    if(log){
        return(
            <div>
                <div className='p-5 bg-gradient-to-r from-cyan-300 to-blue-300 ... min-h-[643px] h-full'>
                    <div className='flex items-center justify-center'>
                        <input className='p-2 border  rounded-lg m-3 shadow-lg' type="text" value={task} placeholder='enter task' onChange={(e)=> setTask(e.target.value)} />
                        <input className='p-2 border  rounded-lg shadow-lg' type="text" value={description} placeholder='enter description' onChange={(e)=> setDescription(e.target.value)}/>
                        <button className='m-4 bg-gradient-to-r from-cyan-500 to-blue-500 ... p-2 rounded-lg' onClick={addTodo}>add todo</button>
                    </div>
                    <div className='flex items-center justify-center'>
                        <input className='p-2 border  rounded-lg shadow-lg' type="text" value={filter} onChange={(e)=> setFilter(e.target.value)}/>
                        <button className='m-4 bg-gradient-to-r from-cyan-500 to-blue-500 ... p-2 rounded-lg' onClick={filterTodos}>filter</button>
                    </div>
                    <div className='grid grid-cols-3 gap-7 p-5 justify-items-center ...'>
                        { toggle ? filteredTodos.map((value) => <DisplayTodo getTodos={getTodos} key={value.id} id={value.id} task={value.task} description={value.description} />) : todos.map((value) => <DisplayTodo getTodos={getTodos} key={value.id} id={value.id} task={value.task} description={value.description} />)}
                    </div> 
                </div>   
            </div>
        )
    }
    else{
        return(
            <div>
                <div className='mt-100 bg-gradient-to-r from-cyan-300 to-blue-300 ... h-screen grid place-content-center ...'>
                    <div className='font-mono font-bold text-3xl'>
                        A to-do app to organize your life
                    </div>
                </div>
            </div>
        )
    }
}

function DisplayTodo(props){

    const navigate = useNavigate();
  
    function deleteTodo(){
        fetch("https://todo-server-chi-weld.vercel.app/delete/"+props.id,
        {
            method : 'DELETE',
            headers : {
                'Content-Type' : 'application/json',
                'accept' : 'application/json',
                'Authorization' : 'Bearer '+ localStorage.getItem('jwt')
            }
        })
        .then((res)=>{
            return res.json();
        })
        .then((data)=>{
            props.getTodos();
            alert(data.message);
        })
        .catch((err)=>{
            alert(err);
            console.log(err);
        })
    }

    function updateTodo(){
        navigate('/update/:'+props.id, {state:{
            id : props.id,
            task : props.task,
            description : props.description
        }});
    }

    return(
        <div className='border bg-white rounded-lg p-5 shadow-xl w-80 max-w-80 flex-grow'> 
            <div className='flex-grow break-words'>
                {props.task} 
            </div>
            <div className='mt-2'>
                {props.description}
            </div>
            <div className='mt-4'>
                <button className='bg-gradient-to-r from-cyan-500 to-blue-500 ... p-2 rounded-lg' onClick={deleteTodo}>delete</button>
                <button className='bg-gradient-to-r from-cyan-500 to-blue-500 ... p-2 rounded-lg ml-3' onClick={updateTodo}>update</button>
            </div>
        </div>
    )
}

export default Todo;