import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import NewGoo from './NewGoo'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/newgoo' component={NewGoo}/>
    </Switch>
  </main>
)

export default Main
