import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Buttons from "./Buttons";

function Table() {
  const [page, setPage] = useState(1);
  // -> this is storing all the api fetched data
  const [response, setResponse] = useState();
  // -> to work with totallamount made against the loan
  const [totallTransactions, setTotallTransactions] = useState();

  // -> to calucalate totall_number of entries to work on back and next button
  const [totallAmount, setTotallAmount] = useState();

  const navigate = useNavigate();
  useEffect(() => {
    // -> GET API Request on page rendering
    axios
      .get(`http://localhost:3000/get-transactions?page=${page}`)
      .then((response) => {
        // Handle the response data
        setResponse(response.data);
        setTotallTransactions(response.data.totallLength / 2);
        setTotallAmount(response.data.totallAmount);
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  }, [page]);
  // -> Converting the 'totallAmount' object into array
  // if (response) {
  //   var finalResult = Object.entries(response.totallAmount);
  // }

  const [sortOrder, setSortOrder] = useState(true);

  const handleSort = () => {
    setResponse((prevObject) => ({
      ...prevObject,
      limitedTransactions: [...prevObject.limitedTransactions].reverse(),
    }));
    function ReverseValues(obj) {
      const values = Object.values(obj);
      if (sortOrder) {
        values.reverse();
      } else {
        values.reverse();
      }
      return Object.fromEntries(
        Object.entries(obj).map(([key]) => [key, values.shift()])
      );
    }

    setTotallAmount(ReverseValues(totallAmount));
  };

  // console.log(totallAmount?.[0]);
  return (
    <div className="w-full sm:w-1/2 block m-auto">
      <table className="bg-gray-50 w-full m-auto mt-12 shadow-md rounded-sm ">
        <thead>
          <tr className="bg-gray-100   ">
            <th className="cursor-pointer" onClick={handleSort}>
              ID
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-sort-down inline ml-1 cursor-pointer"
                viewBox="0 0 16 16"
              >
                <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293V2.5zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z" />
              </svg>
            </th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Total Amount</th>
            <th>Total Paid Amount</th>
          </tr>
        </thead>

        <tbody>
          {response?.limitedTransactions?.map((values, index) => {
            return (
              <tr className="text-center" key={index}>
                <td>{values.id}</td>
                <td>{values.sender}</td>
                <td>{values.receiver}</td>
                <td>{values.totalAmount}</td>
                <td
                  className="cursor-pointer"
                  onClick={() =>
                    navigate(`/installment/${values.id}`, {
                      state: [
                        values.sender,
                        values.receiver,
                        values.totalAmount,
                      ],
                    })
                  }
                >
                  {totallAmount?.[index]}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Buttons
        Transactions={totallTransactions}
        page={page}
        setPage={setPage}
      />
    </div>
  );
}

export default Table;
