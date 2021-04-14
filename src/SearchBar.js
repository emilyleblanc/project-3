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
        <button>Acrylic/Wool</button>
        <button>Cotton</button>
    </div>)
}

export default SearchBar;