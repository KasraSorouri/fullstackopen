import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addNew(state, action) {
      state.push(action.payload)
    },
    update(state, action) {
      const id = action.payload.id
      const newData = action.payload
      return state.map(data => data.id !== id ? data : newData)
    },
    init(state, action) {
      return action.payload
    },
    remove(state, action) {
      const id = action.payload
      return state.filter(data => data.id !== id )
    }
  }
})

export const { addNew, update, init, remove } = blogSlice.actions

export const createBlog = newBlog => {
  return async dispatch => {
    const response = await blogService.addBlog(newBlog)
    dispatch(addNew(response))
  }
}

export const updateBlog = newBlog => {
  return async dispatch => {
    const response = await blogService.editBlog(newBlog)
    dispatch(update(response))
  }
}

export const addComment = ( id, newComment ) => {
  console.log('add comment id -> ',id , ' comment', newComment)
  return async dispatch => {
    try {
      const response = await blogService.addComment(id, newComment)
      dispatch(update(response))
    } catch (e) {
      console.log('error ->', e.message)
      dispatch(setNotification(e.message,5))
    }

  }
}

export const initialize = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(init(blogs))
  }
}

export const deleteBlog = (id) => {
  console.log('reducer delete id ->', id)
  return async dispatch => {
    const response = await blogService.deleteBlog(id)
    console.log('delete response ->', response)
    dispatch(remove(id))
  }
}


export default blogSlice.reducer