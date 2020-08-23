import React, { useContext } from 'react'
import Product from './Product'
import ProductsContext from '../context/ProductsContext'

function App() {
  const { products } = useContext(ProductsContext)

  return (
    <div className="content">
      <h1 className="content__title">Ты сегодня покормил кота?</h1>
      <div className="content__inner">
        {products.map((product) => (
          <Product product={product} key={product.id} />
        ))}
      </div>
    </div>
  )
}

export default App
