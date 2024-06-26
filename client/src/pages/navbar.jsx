import { useRecoilState, useSetRecoilState } from "recoil";
import { logState } from "../store/state";
import { useNavigate } from "react-router-dom";
import { toggleAtom } from "../store/state";
import { filterAtom } from "../store/state";

function Navbar(){

    const navigate = useNavigate();

    const [log,setLog] = useRecoilState(logState);
    const setToggle = useSetRecoilState(toggleAtom);
    const setFilter = useSetRecoilState(filterAtom);

    function goToLogin(){
        navigate('/login');
    }

    function goToSignup(){
        navigate('/signup');
    }
    function toTodos(){
        setToggle(false);
        setFilter("");
        navigate('/');
    }

    function logout(){
        localStorage.removeItem('jwt');
        setLog(false);
        alert("logged out");
        navigate('/login');
    }

    if(log){
        return(
            <div>
                <div className='flex justify-between w-full h-15 bg-gradient-to-r from-cyan-500 to-blue-500 ...'> 
                    <div className='p-3 ml-5 text-lg font-mono font-bold'>
                        <button onClick={toTodos}>Todo</button>
                    </div>
                    <div className='p-3 mr-5 text-lg font-mono font-bold'>
                        <button onClick={logout}>logout</button>
                    </div>
                </div> 
            </div>
        )
    }
    else{
        return(
            <div>
                <div className='flex justify-between w-full h-15 bg-gradient-to-r from-cyan-500 to-blue-500 ...'> 
                    <div className='p-3 ml-5 text-lg font-mono font-bold'>
                        <button onClick={toTodos}>Todo</button>
                    </div>
                    <div className='p-3 mr-5 text-lg font-mono font-bold'>
                        <button className='mr-5' onClick={goToSignup}>Signup</button>
                        <button onClick={goToLogin}>Login</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Navbar;