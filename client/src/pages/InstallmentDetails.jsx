import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
function InstallmentDetails() {
  const { id } = useParams();
  const location = useLocation();
  const { state } = location;
  const [apiData, setApiData] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    // -> GET API Request on page rendering
    axios
      .get(`http://localhost:3000/transactionDetails/id=${id}`)
      .then((response) => {
        // Handle the response data
        setApiData(response.data);
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  }, [0]);
  return (
    <div className="p-4">
      <h2 className="text-white text-5xl text-center">Installment details</h2>
      <div className="flex items-center justify-center">
        <table className="bg-gray-50 w-full sm:w-1/2  m-auto mt-12 shadow-sm">
          <thead>
            <tr className="bg-gray-100   ">
              <th>ID</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Total Amount</th>
              <th>Paid Amount</th>
            </tr>
          </thead>

          <tbody>
            {apiData?.map((values, index) => {
              return (
                <tr className="text-center" key={index}>
                  <td>{values.id}</td>
                  <td>{state?.[0]}</td>
                  <td>{state?.[1]}</td>
                  <td>{state?.[2]}</td>
                  <td>{values.paidAmount}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <button
        onClick={() => navigate(-1)}
        className=" m-auto mt-4 p-2 bg-white rounded-lg flex justify-center items-center
      hover:bg-gray-400 hover:text-white hover:border-2 border-solid border-gray-800
      "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-house mr-2"
          viewBox="0 0 16 16"
        >
          <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z" />
        </svg>
        Go Home
      </button>
    </div>
  );
}

export default InstallmentDetails;
