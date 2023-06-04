function Buttons({ page, Transactions, setPage }) {
  return (
    <div className="flex justify-center gap-4 w-full p-2 ">
      <button
        className="bg-gray-300 p-2 rounded-lg shadow-md flex items-center justify-center
        hover:bg-white
        "
        // -> User can't go back from 1 , it's least number required
        onClick={() => {
          if (page > 1) {
            setPage(page - 1);
          }
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-caret-left-fill"
          viewBox="0 0 16 16"
        >
          <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
        </svg>
        Back
      </button>

      <button
        // -> User can't go next more than the number of transaction
        onClick={() => {
          if (page <= Transactions) {
            setPage(page + 1);
          }
        }}
        className="bg-gray-300 p-2 rounded-lg shadow-md flex justify-center items-center
        hover:bg-white
        "
      >
        Next
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-caret-right-fill"
          viewBox="0 0 16 16"
        >
          <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
        </svg>
      </button>
    </div>
  );
}

export default Buttons;
