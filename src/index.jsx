import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import ProductsProvider from './context/ProductsProvider'
import '@data/styles'
import '@data/images'

const app = (
  <ProductsProvider>
    <App />
  </ProductsProvider>
)

ReactDOM.render(app, document.getElementById('root'))
