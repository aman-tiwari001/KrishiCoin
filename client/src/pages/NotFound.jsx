import { Link } from "react-router-dom";

function NotFound() {
    return ( 
        <div className="w-screen h-screen flex items-center justify-center">
            <h1 className="bg-red-500 w-[400px] h-[200px] rounded-lg  text-white font-bold text-xl  flex flex-col items-center justify-center">404: Not Found  <Link to="/home">

<button className="btn btn-warning mt-4">Go Home</button>
</Link></h1>

           
        </div>
     );
}

export default NotFound;