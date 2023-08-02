import { createSlice } from '@reduxjs/toolkit'

type Item = {
  id: number
  name: string
  price: number
  subQuantity: number
  subTotal: number
}
type ItemsListType = Array<Item>

type SliceType = {
  name: string
  initialState: {
    itemsList: ItemsListType
    quantity: number
    total: number
    deleteWarnings: {
      showed: boolean
      deletedLocationIdx: null | number
    }
  }

}
export const cartSlice = createSlice({
  name: 'CART',
  initialState: { 
    itemsList: [] as ItemsListType,
    quantity: 0,
    total: 0,
    deleteWarnings: {
      showed: false,
      deletedLocationIdx: null,
    }
  },
  reducers: { 
    updateCheckout: (state, action) => {
      state.itemsList = action.payload
    },
    changeQuantity: (state, action) => {
      const { index, id, quantity } = action.payload
      if (quantity === 0) {
        state.itemsList.splice(index, 1)
        return
      }
      state.itemsList[index] = {
        ...state.itemsList[index],
        subQuantity: quantity,
      }
    },
    addToCart(state, action) {
      state.quantity += (action.payload.quantity ?? 1)
      state.total += ((action.payload.quantity ?? 1) * action.payload.price)
      if (action.payload.index) {
        state.itemsList[action.payload.index].subQuantity ++
        state.itemsList[action.payload.index].subTotal += action.payload.price
        return
      }
      const newItem = action.payload
      const existingItem = state.itemsList.find(item => item.id === newItem.id)
      if (existingItem) {
        if (action.payload.quantity > 1) {
          existingItem.subQuantity += action.payload.quantity
          existingItem.subTotal += (action.payload.quantity * existingItem.price)
        } else {
          existingItem.subQuantity++
          existingItem.subTotal += existingItem.price
        }
        console.log("###", existingItem.subTotal)
        return 
      }
      state.itemsList.push({
        ...newItem,
        subQuantity: action.payload.quantity ?? 1,
        subTotal: (action.payload.quantity ?? 1) * newItem.price
      })
      
    },
    removeFromCart(state, action) {
      state.quantity--
      state.total -= action.payload.price
      state.itemsList[action.payload.index].subQuantity --
      state.itemsList[action.payload.index].subTotal -= action.payload.price
      if(state.itemsList[action.payload.index].subQuantity === 0) {
        state.itemsList.splice(action.payload.index, 1)
      }
      return
    },
    deleteFromCart(state, action) {
      const deletedItem: Item = state.itemsList.splice(action.payload.index, 1)[0]
      state.quantity -= deletedItem.subQuantity
      state.total -= deletedItem.subTotal
    },
    openDeleteWarnings(state, action) {
      state.deleteWarnings.showed = true
      state.deleteWarnings.deletedLocationIdx = action.payload.index
    },
    closeDeleteWarnings(state, action) {
      state.deleteWarnings.showed = false
      const idx = state.deleteWarnings.deletedLocationIdx
      if (action.payload.delete && idx !== null) {
        const deletedItem: Item = state.itemsList.splice(idx, 1)[0]
        state.quantity -= deletedItem.subQuantity
        state.total -= deletedItem.subTotal
        state.deleteWarnings.deletedLocationIdx = null
      }
    },
  }
})


// console.log(cartSlice);

export const cartActions = cartSlice.actions