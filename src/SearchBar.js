// SearchBar.js

const SearchBar = (props) => {
    const handleBambooClick = () => {
        const filter = "bamboo";
        props.handleFilter(filter);
    }

    const handleBlendClick = () => {
        const filter = "acrylic,wool";
        props.handleFilter(filter);
    }

    const handleWoolClick = () => {
        const filter = "merino wool";
        props.handleFilter(filter);
    }

    return (<div>
        <p>Search by Fiber:</p>
        <button onClick = {handleBambooClick}>Bamboo</button>
        <button onClick = {handleBlendClick}>Acrylic/Wool</button>
        <button onClick = {handleWoolClick}>Wool</button>
    </div>)
}

export default SearchBar;