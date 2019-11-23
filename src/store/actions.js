import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
  addcar(context, payload) {
    return new Promise((resolve, reject) => {
      // state.carList.push(payload)
      let oldProduct = null
      for(let item of context.state.carList) {
        if (item.iid ===payload.iid ) {
          oldProduct = item
        }
      }
      if (oldProduct) {
        // oldProduct.count += 1
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前商品数量+1')
      } else {
        payload.count = 1
        // state.carList.push(payload)
        context.commit(ADD_TO_CART, payload)
        resolve('当前商品已加入购物车')
      }
    })
  }
}
