import {SignUp} from './signup'
import {SignIn} from './signin.js'
import {Home} from './home.jsx'
import {BrowserRouter as Router , Routes ,Route} from 'react-router-dom'

function App() {
  return (
    
       <Router>
          <Routes>
             <Route path="/" element={<SignUp/>} > </Route>
             <Route path="/signin" element={<SignIn/>} > </Route>
             <Route path="/home" element={<Home/>} > </Route>
          </Routes>
        </Router>
        
    
  );
}

export default App;
