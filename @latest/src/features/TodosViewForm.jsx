import { useEffect, useState } from 'react';

function TodosViewForm({
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
  queryString,
  setQueryString,
}) {
  const preventRefresh = (event) => {
    event.preventDefault();
  };

  const [localQueryString, setLocalQueryString] = useState(queryString);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setQueryString(localQueryString);
    }, 500);

    return () => {
      clearTimeout(debounce);
    };
  }, [localQueryString, setQueryString]);

  return (
    <>
      <form onSubmit={preventRefresh}>
        <div>
          <label htmlFor="search">Search Todos</label>
          <input
            onChange={(e) => {
              setLocalQueryString(e.target.value);
            }}
            type="text"
            value={localQueryString}
            id="search"
            name="search"
          ></input>
          <button
            onClick={(e) => {
              setLocalQueryString('');
            }}
            type="button"
          >
            Clear
          </button>
        </div>
        <div>
          <label htmlFor="sort">Sort by</label>
          <select
            onChange={(event) => {
              setSortField(event.target.value);
            }}
            value={sortField}
            id="sort"
            name="sort"
          >
            <option value="title">Title</option>
            <option value="createdTime">Time Added</option>
          </select>

          <label htmlFor="direction">Direction</label>
          <select
            onChange={(event) => {
              setSortDirection(event.target.value);
            }}
            value={sortDirection}
            id="direction"
            name="direction"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </form>
    </>
  );
}

export default TodosViewForm;
