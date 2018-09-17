import moment from 'moment'
import { store } from '../index'

export const toggleForm = () => {
  return {
    type: 'TOGGLE_FORM'
  }
}

export const confirmUser = () => {
  return {
    type: 'TOGGLE_CONFIRM'
  }
}

export const toggleChat = () => {
  return {
    type: 'TOGGLE_CHAT'
  }
}

export const submitRequest = () => {
  const s = store.getState()
  const pl = {
    userDetails: s.userDetails,
    slot: s.selectedSlot,
    notes: s.requestNotes
  }
  return {
    type: 'SUBMIT_REQUEST',
    ...pl
  }
}

export const sendChat = (payload) => {
  return {
    type: 'SEND_CHAT',
    payload
  }
}

export const showDetails = (id) => {
  return {
    type: 'SHOW_DETAILS',
    id: id
  }
}

export const setCurrentDate = (date) => {
  const hours = [8,9,10,11,12,13,14,15,16];
  const moments = hours.map((h) => {
    return moment(date).hour(h).minute(0).second(0)
  })
  const s = store.getState()
  const choices = moments.map((m) => {

    let booked = false

    s.appts.map((a) => {
      if(a.slot.moment.isSame(m,'hour')) {
        booked = true
      }
    })

    return {
      moment: m,
      booked: booked,
      display: moment(m).format("ddd, MMM Do, hA"),
      past: m.isBefore(moment()),
      id: Math.random(),
      selected: false
    }
  })
  return dispatch => {
    dispatch({
      type: 'SET_DATE',
      date: date
    })
    dispatch({
      type: 'SET_CHOICES',
      choices: choices
    })
  }
}

export const setCurrentSlot = (slot) => {
  return dispatch => {
    dispatch({
      type: 'SET_SLOT',
      slot: slot
    })
  }
}

export const updateUserForm = (e) => {
  return {
    type: 'UPDATE_USERFORM',
    v: e.target.value,
    f: e.target.id
  }
}