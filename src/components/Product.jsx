import React, { useContext } from 'react'
import ProductsContext from '../context/ProductsContext'

const Product = ({ product }) => {
  const { toggleProduct, enterProduct, leaveProduct } = useContext(
    ProductsContext
  )

  const portions = product.description.portions
  const mouses = product.description.mouses
  const portionText = endingWord(product, 'portions')
  const mousesText = endingWord(product, 'mouses')

  const classesItem = ['content-item']
  if (!product.available) classesItem.push('disabled')
  else if (product.selected) classesItem.push('selected')

  const classesBox = ['content-item__box']
  if (product.available && product.hovered) {
    classesBox.push('hovered')
  }

  const classesSubtitle = ['content-item__subtitle']
  if (product.available && product.selected && product.hovered){
    classesSubtitle.push('cancel')
  }

  const toggleHandler = (product) => {
    if (!product.available) return

    toggleProduct(product.id)
  }

  const enterHandler = (product) => {
    if (!product.available) return

    enterProduct(product.id)
  }

  const leaveHandler = (product) => {
    if (!product.available) return
    leaveProduct(product.id)
  }

  return (
    <div className={classesItem.join(' ')}>
      <div
        className={classesBox.join(' ')}
        onClick={() => toggleHandler(product)}
        onMouseLeave={() => leaveHandler(product)}
        onMouseEnter={() => enterHandler(product)}
      >
        <div className="content-item__inner">
          <div className={classesSubtitle.join(' ')}>
            {product.selected && product.hovered ? (
              <>Котэ не одобряет?</>
            ) : (
              <>Сказочное заморское яство</>
            )}
          </div>
          <div className="content-item__firm">Нямушка</div>
          <div className="content-item__filling">{product.filling}</div>
          <ul className="content-item__list">
            <li className="content-item__list-item">
              <span>{portions}</span> {portionText}
            </li>
            <li className="content-item__list-item">
              {mouses == 1 ? '' : <span>{mouses}</span>} {mousesText} в подарок
            </li>
            {product.description.more.length
              ? product.description.more.map((item, index) => (
                  <li className="content-item__list-item" key={index}>
                    {item}
                  </li>
                ))
              : ''}
          </ul>
          <div className="content-item__weight">
            <div className="content-item__weight-value">{product.weight}</div>
            <div className="content-item__weight-unit">кг</div>
          </div>
        </div>
        <div className="content-item__bg">
          <img src="cat.png" alt="Котэ" />
        </div>
      </div>
      <div className="content-item__descr">
        {product.available ? (
          product.selected ? (
            <>{product.description.detail}</>
          ) : (
            <>
              Чего сидишь? Порадуй котэ,{' '}
              <button
                className="content-item__descr-btn"
                onClick={() => toggleHandler(product)}
              >
                купи
              </button>
              <span>.</span>
            </>
          )
        ) : (
          `Печалька, ${product.filling} закончился.`
        )}
      </div>
    </div>
  )
}

function endingWord(product, param) {
  let text
  let length
  let lastNum
  let oneDozen

  switch (param) {
    case 'mouses':
      const mouses = String(product.description[param])
      length = mouses.length
      lastNum = mouses[length - 1]
      oneDozen = false
      if (length > 2) oneDozen = mouses[length - 2] == 1

      if (lastNum == 1 && !oneDozen) text = 'мышь'
      else if (lastNum >= 2 && lastNum <= 4 && !oneDozen) text = 'мыши'
      else text = 'мышей'
      break
    case 'portions':
      const portions = String(product.description[param])
      length = portions.length
      lastNum = portions[length - 1]
      oneDozen = false
      if (length > 1) oneDozen = portions[length - 2] == 1

      if (lastNum == 1 && !oneDozen) text = 'порция'
      else if (lastNum >= 2 && lastNum <= 4 && !oneDozen) text = 'порции'
      else text = 'порций'
      break
  }

  return text
}

export default Product
