import React, { useReducer } from 'react'
import ProductsContext from './ProductsContext'
import productsReducer from './productsReducer'
import { TOGGLE_PRODUCT, ENTER_PRODUCT, LEAVE_PRODUCT } from './types'

const ProductsProvider = ({children}) => {
  const initialState = [
    {
      id: 1,
      weight: 0.5,
      filling: 'с фуа-гра',
      selected: false,
      available: true,
      hovered: false,
      description: {
        portions: '10',
        mouses: '1',
        more: [],
        detail: 'Печень утки разварная с артишоками.'
      },
    },
    {
      id: 2,
      weight: 2,
      filling: 'с рыбой',
      selected: false,
      available: true,
      hovered: false,
      description: {
        portions: '40',
        mouses: '2',
        more: [],
        detail: 'Головы щучьи с чесноком да свежайшая сёмгушка.'
      },
    },
    {
      id: 3,
      weight: 5,
      filling: 'с курой',
      selected: false,
      available: false,
      hovered: false,
      description: {
        portions: '100',
        mouses: '5',
        more: ['заказчик доволен'],
        detail: 'Филе из цыплят с трюфелями в бульоне.'
      },
    },
  ]
  const [state, dispatch] = useReducer(productsReducer, initialState)

  const toggleProduct = (id) => {
    const newState = state.map((product) => {
      if (product.id === id){
        product.selected = !product.selected
        product.hovered = false
      }
      return product
    })
    dispatch({
      type: TOGGLE_PRODUCT,
      payload: newState
    })
  }

  const enterProduct = id => {
    const newState = state.map(product => {
      if (product.id === id) product.hovered = true
      return product
    })
    dispatch({
      type: ENTER_PRODUCT,
      payload: newState
    })
  }

  const leaveProduct = id => {
    const newState = state.map(product => {
      if (product.id === id) product.hovered = false
      return product
    })
    dispatch({
      type: LEAVE_PRODUCT,
      payload: newState
    })
  }

  return (
    <ProductsContext.Provider value={{
      products: state,
      toggleProduct,
      enterProduct,
      leaveProduct
    }}>
      {children}
    </ProductsContext.Provider>
  )
}

export default ProductsProvider