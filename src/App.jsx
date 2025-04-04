import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom' 
import Auth from './Auth'
import ExpenseTracker from './Expense-tracker'
function App() {

  return (
    <div className='w-full h-full'>
      <Router>
        <Routes>
          <Route path='/' element={<Auth/>}/>
          <Route path='/expense-tracker' exact element={<ExpenseTracker/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
