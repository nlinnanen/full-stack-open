import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {

  const alterState = (typeToAlter) => {
    return  ()  => store.dispatch({
      type: typeToAlter.toUpperCase()
    })
  }


  return (
    <div>
      <button onClick={alterState('good')}>good</button> 
      <button onClick={alterState('ok')}>ok</button> 
      <button onClick={alterState('bad')}>bad</button>
      <button onClick={alterState('zero')}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
