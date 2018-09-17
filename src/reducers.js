import { combineReducers } from 'redux'

const userConfirmed = (state = false, action) => {
  if(action.type === 'TOGGLE_CONFIRM') {
    return true
  }
  return state
}

const appts = (state = [], action) => {
  if(action.type === 'SUBMIT_REQUEST') {
    const s = [...state]
    s.unshift({userDetails: action.userDetails, notes: action.notes, slot: action.slot, showDetails: false, id: Math.random()})
    return s
  }
  if(action.type === 'SHOW_DETAILS') {
    const s = [...state]
    return s.map((a) => {
      if(a.id === action.id) {
        a.showDetails = !a.showDetails
      } else {
        a.showDetails = false
      }
      return a
    })
  }
  return state
}

const brandingImage = (state = null, action) => {
  return state
}

const showForm = (state = false, action) => {
  if(action.type === 'TOGGLE_FORM') {
    return !state
  }
  if(action.type === 'SUBMIT_REQUEST') {
    return false
  }
  return state
}

const lorem = `We specialize in vehicular accidents, foot burns, and bear attacks. 
To make the scheduling process easy, use this form to 
set up appointments. You can view your existing 
appointments below. If you get stuck please use the 'Start Chat' button at the bottom.`

const brandingMessage = (state = lorem, action) => {
  return state
}

const helpChats = (state = [{person: 'office', message: 'Hi Creed, Kelly here - what are you having problems with today?'}], action) => {
  if(action.type === 'SEND_CHAT') {
    const s  = [...state]
    s.push({person: action.payload.person, message: action.payload.message})
    return s
  }
  return state
}

const showChat = (state = false, action) => {
  if(action.type === 'TOGGLE_CHAT') {
    return !state
  }
  return state
}

const selectedDate = (state = null, action) => {
  if(action.type === 'SET_DATE') {
    return action.date
  }
  if(action.type === 'SUBMIT_REQUEST') {
    return null
  }
  return state
}

const dateChoices = (state = [], action) => {
  if(action.type === 'SET_CHOICES') {
    return action.choices
  }
  if(action.type === 'SET_SLOT') {
    const s = [...state]
    s.map((slot) => {
      if(action.slot.id === slot.id) {
        slot.selected = true
      } else {
        slot.selected = false
      }
      return slot
    })
  }
  if(action.type === 'SUBMIT_REQUEST') {
    return []
  }
  return state
}

const selectedSlot = (state = null, action) => {
  if(action.type === 'SET_SLOT') {
    return action.slot
  }
  if(action.type === 'SUBMIT_REQUEST') {
    return null
  }
  return state
}

const requestNotes = (state = '', action) => {
  if(action.type === 'UPDATE_USERFORM') {
    if(action.f === 'userNotes') {
      return action.v
    }
  }
  if(action.type === 'SUBMIT_REQUEST') {
    return ''
  }
  return state
}

const default_user = {
  firstName: 'Creed', 
  lastName: 'Bratton', 
  phone: '7027045715', 
  email: 'cbrat245@verizon.net'
}

const userDetails = (state = default_user, action) => {
  if(action.type === 'UPDATE_USERFORM') {
    if(action.f === 'userFirst') {
      const s = {...state}
      s.firstName = action.v
      return s
    }
    if(action.f === 'userLast') {
      const s = {...state}
      s.lastName = action.v
      return s
    }
    if(action.f === 'userEmail') {
      const s = {...state}
      s.email = action.v
      return s
    }
    if(action.f === 'userPhone') {
      const s = {...state}
      s.phone = action.v
      return s
    }
  }
  return state
}

export const RootReducer = combineReducers({
  userConfirmed,
  appts,
  brandingImage,
  brandingMessage,
  showForm,
  helpChats,
  showChat,
  selectedDate,
  dateChoices,
  selectedSlot,
  userDetails,
  requestNotes
})