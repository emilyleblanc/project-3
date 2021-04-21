// SearchBar.js
import {useState} from 'react';

const SearchBar = (props) => {
    const {handleFilterByFiber} = props;
    const [userChoice, setUserChoice] = useState('placeholder');

    const handleUserChoice = (event) => {
        setUserChoice(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        handleFilterByFiber(userChoice);
    }
        

    return (
    <form action=""  onSubmit={handleSubmit} className="searchBar">
        <label>Search by Fiber: </label>
        <select name="fibers" id="fibers" value={userChoice} onChange={handleUserChoice}>
            <option value="placeholder" disabled>Choose One:</option>
            <option value="acrylic,wool">Blend</option>
            <option value="bamboo">Bamboo</option>
            <option value="merino wool">Wool</option>
            <option value="all">All Inventory</option>
        </select>
        <button>Search</button>
    </form>)

}

export default SearchBar;