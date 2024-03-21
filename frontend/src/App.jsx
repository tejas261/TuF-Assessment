import Form from './components/Form.jsx';
import SnippetsTable from './components/SnippetsTable.jsx';
import {Routes,Route} from 'react-router-dom'

const App = () => { 
  return (
    <div>
      <Routes>
        <Route path='/' element={<Form/>}/>
        <Route path='/getSnippets' element={<SnippetsTable/>}/>
      </Routes>
    </div>
  );
};

export default App;
