// SearchBar.js

const SearchBar = (props) => {
    const handleBambooClick = () => {
        console.log('bamboo clicked');
        const filter = 'bamboo';
        props.handleFilter(filter);
    }
    return (<div>
        <p>Select by Type:</p>
        <button onClick = {handleBambooClick}>Bamboo</button>
        <button onClick = {handleBlendClick}>Acrylic/Wool</button>
        <button onClick = {handleWoolClick}>Wool</button>
    </div>)
}

export default SearchBar;