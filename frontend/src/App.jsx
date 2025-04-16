import React from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'; 
import store, { persistor } from './redux/store'; 
import Home from './Pages/Home';
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";


function App() {
  

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/login" element={<Login />}/>
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  )
}

export default App
