import SearchIcon from "../../icons/SearchIcon";
import PropTypes from "prop-types";

const SearchBar = ({setSearchValue, searchValue}) => {
    const handleOnChange = (event) => {
        const text = event.target.value;
        setSearchValue(text);
      };

  return (
    <form className="max-w-lg mx-auto">
      <div className="flex">
        
        <div className="relative w-full">
          <input
            
            type="text"
            id="search-dropdown"
            onChange={handleOnChange}
            value={searchValue}
            className="block p-2.5 w-full z-20 text-sm text-white bg-[#21212d] rounded-lg border-s-[#58aaae] border-s-2 border border-[#58aaae] focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            placeholder="Busca por cualquier campo..."
            required
          />
          <div
            className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-[#242529] rounded-e-lg border border-[#58aaae]"
          >
            <SearchIcon/>
            <span className="sr-only">Search</span>
          </div>
        </div>
      </div>
    </form>
  );
};

SearchBar.propTypes = {
    setSearchValue: PropTypes.func,
    searchValue: PropTypes.string
}

export default SearchBar;
