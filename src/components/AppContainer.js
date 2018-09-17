import { connect } from 'react-redux'
import App from './App'
import * as Actions from '../actions'

const mapStateToProps = (state) => ({ 
  brandingMessage: state.brandingMessage,
  showForm: state.showForm,
  userConfirmed: state.userConfirmed,
  showChat: state.showChat,
  appts: state.appts,
  helpChats: state.helpChats,
  selectedDate: state.selectedDate,
  dateChoices: state.dateChoices,
  selectedSlot: state.selectedSlot,
  user: state.userDetails,
  requestNotes: state.requestNotes
})

const mapDispatchToProps = (dispatch) => ({
  toggleForm: () => dispatch(Actions.toggleForm()),
  confirmUser: () => dispatch(Actions.confirmUser()),
  toggleChat: () => dispatch(Actions.toggleChat()),
  submitRequest: () => dispatch(Actions.submitRequest()),
  sendChat: (payload) => dispatch(Actions.sendChat(payload)),
  showDetails: (id) => dispatch(Actions.showDetails(id)),
  setCurrentDate: (date) => dispatch(Actions.setCurrentDate(date)),
  setCurrentSlot: (slot) => dispatch(Actions.setCurrentSlot(slot)),
  updateUserForm: (e) => dispatch(Actions.updateUserForm(e))
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
