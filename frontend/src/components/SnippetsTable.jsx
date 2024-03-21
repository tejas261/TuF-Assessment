import { useContext, useState } from "react";
import { FormContext } from "../context/Context";
import { useNavigate } from "react-router-dom";
import BounceLoader from "react-spinners/BounceLoader";
import axios from "axios";

const SnippetsTable = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(true);
  const [snippetOutputs, setSnippetOutputs] = useState({}); 
  const { snippets, setSnippets, fetchSnippets } = useContext(FormContext);

  async function handleFetchSnippets() {
    const data = await fetchSnippets();
    setSnippets(data);
  }

  function goBack() {
    navigate("/");
  }

  async function handleExecuteSnippet(id) {
    try {
      setloading(true)
      const response = await axios.post("https://tuf-assessment.onrender.com/run-code", {
        id,
      });
      setSnippetOutputs((prevState) => ({
        ...prevState,
        [id]: response.data.output,
      }));
      setloading(false);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="border border-solid m-20 w-[50rem] rounded-xl shadow-xl">
      <h2 className="text-xl text-center py-5 font-bold">Submitted Snippets</h2>
      <table className="m-10">
        <thead>
          <tr>
            <th>Username</th>
            <th>Language</th>
            <th>Standard Input</th>
            <th>Snippet</th>
            <th>Time</th>
            <th>Output</th>
          </tr>
        </thead>
        <tbody>
          {snippets.map((snippet) => (
            <tr key={snippet.id}>
              <td>
                {snippet.username != null ? (
                  snippet.username
                ) : (
                  <h1>Field is empty</h1>
                )}
              </td>
              <td>
                {snippet.language != null ? (
                  snippet.language
                ) : (
                  <h1>Field is empty</h1>
                )}
              </td>
              <td>
                {snippet.stdin != null ? (
                  snippet.stdin
                ) : (
                  <h1>Field is empty</h1>
                )}
              </td>
              <td className="flex flex-col border-none">
                {snippet.code_snippet != null ? (
                  snippet.code_snippet.slice(0, 100)
                ) : (
                  <h4>Field is empty</h4>
                )}
                <button
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 w-40"
                  onClick={() => handleExecuteSnippet(snippet.id)} 
                >
                  Execute
                </button>
              </td>
              <td>
                {snippet.timestamp != null ? (
                  snippet.timestamp
                ) : (
                  <h4>Field is empty</h4>
                )}
              </td>
              <td>
                {loading ? <BounceLoader color="#287ec5"/> :(
                  JSON.stringify(snippetOutputs[snippet.id])
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="m-10">
        <button
          className="text-white bg-indigo-400 hover:bg-indigo-600 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={handleFetchSnippets}
        >
          Fetch data
        </button>
        <button
          onClick={goBack}
          className="text-white bg-purple-400 hover:bg-purple-500 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Go to Form
        </button>
      </div>
    </div>
  );
};

export default SnippetsTable;
