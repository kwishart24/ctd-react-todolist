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

  return (
    <>
      <form onSubmit={preventRefresh}>
        <div>
          <label htmlFor="search">Search Todos</label>
          <input
            onChange={(e) => {
              setQueryString(e.target.value);
            }}
            type="text"
            value={queryString}
            id="search"
            name="search"
          ></input>
          <button
            onClick={(e) => {
              setQueryString('');
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
