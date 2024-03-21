/* eslint-disable react/prop-types */
import { createContext,useState } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const FormContext = createContext();

const FormContextProvider = ({ children }) => {
  const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        language: 'C',
        stdin: '',
        code_snippet: '',
      });
    const [snippets, setSnippets] = useState([]);
    
      const fetchSnippets = async () => {
        try {
          const response = await axios.get('https://tuf-assessment.onrender.com/snippets');
          const data = await response.data;
          // console.log(data.data);
          return data.data
        } catch (error) {
          console.error('Error fetching snippets:', error);
        }
      };    
    
      const addSnippet = async (formData) => { 
        try {
          const response = await axios.post('https://tuf-assessment.onrender.com/snippets', formData);
          const data = await response.data;
          console.log(data);
          navigate('/getSnippets')
        } catch (error) {
          console.error('Error adding snippet:', error);
        }
      };

    const contextValues = {setFormData,formData,snippets,setSnippets,addSnippet,fetchSnippets}
        
  return (
    <FormContext.Provider value={contextValues}>
      {children}
    </FormContext.Provider>
  );
};

export { FormContext, FormContextProvider };
