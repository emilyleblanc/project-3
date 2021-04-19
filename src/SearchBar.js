// SearchBar.js
import {useState} from 'react';

const SearchBar = () => {
    const [userChoice, setUserChoice] = useState('placeholder');

    const handleUserChoice = (event) => {
        console.log(event.target.value)
        setUserChoice(event.target.value)
    }

    return (<div className="searchBar">
        <p>Search by Fiber:</p>
        <select name="fibers" id="fibers" value={userChoice} onChange={handleUserChoice}>
            <option value="placeholder" disabled>Choose One:</option>
            <option value="acrylic, wool">Blend</option>
            <option value="bamboo">Bamboo</option>
            <option value="merino wool">Wool</option>
        </select>
    </div>)

}

export default SearchBar;