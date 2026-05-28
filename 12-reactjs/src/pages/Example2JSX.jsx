import BtnBack from "../components/BtnBack";
export default function Example2JSX() {
    const url='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5X5epizj3hEOUUtReUO8AxGflnwlPlWRSBw&s'
    return (
        <div className="container"> 
            <BtnBack /> 
            <h1>Example2: JSX</h1>
            <p>Writing HTML-like code witin JavaScript using Curly brace &#123</p>
            
            <img className="img-fluid " src={url} alt="Kung Lao" />
        </div>
    );
}