import {Switch, Route} from 'react-router-dom'

import Home from './components/Home'
import CourseItemDetails from './components/Course/index'
import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/courses/:id" component={CourseItemDetails} />
  </Switch>
)

export default App
