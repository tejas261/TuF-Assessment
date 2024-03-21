import { useContext } from 'react';
import { FormContext } from '../context/Context';

const Form = () => {
  const {formData,setFormData,addSnippet} = useContext(FormContext)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        await addSnippet(formData)
      } catch (error) {
        console.error('Error adding snippet:', error);
      }
    // Reset form
    setFormData({
      username: '',
      language: '',
      stdin: '',
      code_snippet: '',
    });
  };

  return (
    <div className='text-lg border border-solid m-20 w-[50rem] rounded-xl shadow-xl text-left'>
    <form className='m-10' onSubmit={handleSubmit}>      
      <h1 className="text-xl text-white text-center font-bold m-10">Code Snippet Manager</h1>
      <div>
        <label htmlFor="">Username : </label>
        <input
        className='p-2 text-lg'
        type="text"
        name="username"
        placeholder="Enter Username"
        value={formData.username}
        onChange={handleChange}
      />
      </div>
     <div>
        <label htmlFor="">Language : </label>
        <select className='p-2 text-lg' name="language" onChange={handleChange}>
            <option value="C">C</option>
            <option value="C++">C++</option>
            <option value="Java">Java</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
        </select>
     </div>
     <div>
        <label htmlFor="">Standard Input : </label>
      <input
        className='p-2 text-lg'
        type="text"
        name="stdin"
        placeholder="Standard Input"
        value={formData.stdin}
        onChange={handleChange}
      />
     </div>
     <div>
        <label htmlFor="">Code Snippet : </label>
      <textarea
        className='p-2 text-lg'
        name="code_snippet"
        placeholder="Enter your code"
        value={formData.code_snippet}
        onChange={handleChange}
        rows={5}
      />
     </div>
      <button className="text-white bg-blue-400 hover:bg-blue-500 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2" type="submit">Submit</button>
    </form>
    </div>
  );
};
 
export default Form;
