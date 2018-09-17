// usually these would be their own files, with container elements,
// and we wouldnt be passing the full props around to the child components

import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';

const App = (props) => (
  <div className="App">
    <Header user={props.user} />
    <Branding brandingMessage={props.brandingMessage} />
    <Form {...props} />
    <Appts {...props} />
    <Help {...props} />
    <Footer />
  </div>
)

const Header = (props) => (
  <div className="Header">
    <div className="Header-logo"></div>
    <div className="Header-nav">
      <ul>
        <li>
          <a href="">Products</a>
        </li>
        <li>
          <a href="">Services</a>
        </li>
        <li>
          <a href="">API</a>
        </li>
        <li>
          <a href="">About</a>
        </li>
      </ul>
    </div>
    <div className="Header-user">
      <div className="Header-profile">
        <div className="Header-profileImage"></div>
        <div className="Header-profileText">
          {props.user.firstName}
          {' '}
          {props.user.lastName}
        </div>
      </div>
      <div className="Header-login" style={{display: 'none'}}>
        Login
      </div>
    </div>
  </div>
)

const Branding = (props) => (
  <div className="Branding">
    <div className="Circle"></div>
    <div className="Branding-header">
      <div className="Branding-logo">
        <div className="img" style={{backgroundImage: 'url("./doc.png")'}}></div>
      </div>
      <div className="Branding-name">
        Michael Scott Wellness Center
        <div className="Branding-address">1725 Slough Avenue - Scranton, PA 89123</div>
      </div>
    </div>
    <div className="Branding-message">
      {props.brandingMessage}
    </div>
  </div>
)

const Form = (props) => (
  <div className="Form">
    <FormBody {...props} />
    <div className={!props.showForm ? "Form-new" : "Form-new closed"}>
      <button className="ghost" onClick={props.toggleForm}>Schedule New Appointment!</button>
    </div>
  </div>
)

const FormBody = (props) => (
  <div className="Form-body">
    <div className="Form-message"></div>
    <div className="Form-container">
      <div className="Form-loading"></div>
      <div className="Form-solve"></div>
      <FormUser {...props} />
      <FormForm {...props} />
    </div>
  </div>
)

const Appts = (props) => (
  <div className="Appts">
    <div className="Appts-heading chunk-heading">
      My Upcoming Appointments
    </div>
    {!props.appts.length ?
    <div className="Form-heading">
      No Appointments Yet, Use Form Above
    </div>
    : 
    <div className="Appts-appts">
      {props.appts.map((appt,i) => (
        <div className="Appts-appt" key={i}>
          <div className="Appts-apptHeading" onClick={() => props.showDetails(appt.id)}>
            {appt.slot.display}
          </div>
          {appt.showDetails &&
            <div className="Appts-apptDetails">
              <div>Patient: {appt.userDetails.firstName}{' '}{appt.userDetails.lastName}</div>
              <div>Phone: {appt.userDetails.phone}</div>
              <div>Email: {appt.userDetails.email}</div>
              <div>Reason: {appt.notes}</div>
            </div>
          }
        </div>
      ))}
    </div>
    }
  </div>
)

const Help = (props) => (
  <div className="Help">
    {!props.showChat &&
    <div>
      <div className="Help-message chunk-heading">
        Need Assistance?
      </div>
      <button onClick={props.toggleChat}>Start Chat</button>
    </div>
    }
    {props.showChat &&
    <div>
      <div className="Help-message chunk-heading">
        Now chatting with Kelly...
      </div>
      <div className="Help-bubble">
        {props.helpChats.map((msg) => (
          <div className={'Help-' + msg.person}>
            {msg.message}
          </div>
        ))}
        {props.agentTyping &&
        <div className="Help-isTyping">
          Kelly is typing...
        </div>
        }
        <div className="Help-gap"></div>
        <form onSubmit={(e) => {e.preventDefault();props.sendChat({person: 'client', message: e.target.children[0].value});e.target.children[0].value = ''}}>
          <input type="text" id="chatMessage" for="idk" />
          <button>Send</button>
        </form>
      </div>
      <button onClick={props.toggleChat} className="cancel">End Chat</button>
    </div>
    }
  </div>
)

const FormUser = (props) => (
  <div className={!props.showForm || props.userConfirmed ? "Form-user closed" : "Form-user"}>
    <div className="Form-heading">
      To get started, please confirm your contact info
    </div>
    <div className="Form-row">
      <div className="Form-nameFirst input-group">
        <label htmlFor="">First Name</label>
        <input type="text" id="userFirst" onChange={e => props.updateUserForm(e)} value={props.user.firstName} />
      </div>
      <div className="Form-nameLast input-group">
        <label htmlFor="">Last Name</label>
        <input type="text" id="userLast" onChange={e => props.updateUserForm(e)} value={props.user.lastName} />
      </div>
    </div>
    <div className="Form-row">
      <div className="Form-email input-group">
        <label htmlFor="">Email Address</label>
        <input type="text" id="userEmail" onChange={e => props.updateUserForm(e)} value={props.user.email} />
      </div>
      <div className="Form-phone input-group">
        <label htmlFor="">Phone</label>
        <input type="text" id="userPhone" onChange={e => props.updateUserForm(e)} value={props.user.phone} />
      </div>
    </div>
    <div className="Form-agree">
      <button className="cancel" onClick={props.toggleForm}>Cancel</button>
      <button className="ghost" onClick={props.confirmUser}>Confirm Details</button>
    </div>
  </div>
)

const FormForm = (props) => (
  <div className={props.userConfirmed && props.showForm === true ? "Form-form" : "Form-form closed"}>
    <div className="Form-heading">
      When would you like to visit?
    </div>
    <div className="Form-row">
      <div className="Form-startDate input-group">
        <label htmlFor="">Date</label>
        <DatePicker onChange={(date) => props.setCurrentDate(date)} selected={props.selectedDate} />
      </div>
      <div className="Form-startTime input-group">
        <label htmlFor="">Time</label>
        {props.dateChoices.filter(c => !c.past).map((c) => {
          if(c.past) {
            return (
              <button className="Form-choice past">
                {c.display}
              </button>
            )
          }
          if(c.booked) {
            return (
              <button className="Form-choice booked">
                {c.display}
              </button>
            )
          }
          if(c.selected) {
            return (
              <button className="Form-choice selected">
                {c.display}
              </button>
            )
          }
          return (
            <button className="Form-choice" onClick={() => props.setCurrentSlot(c)}>
              {c.display}
            </button>
          )
        })}
        {!props.dateChoices.filter(c => !c.past).length && !props.selectedDate &&
        <span>Select a date to begin</span>
        }
        {!props.dateChoices.filter(c => !c.past).length && props.selectedDate &&
        <span>Please select future date</span>
        }
      </div>
    </div>
    <div className="Form-warn"></div>
    <div className="Form-status"></div>
    <div className="Form-notes">
      <div className="input-group">
        <label htmlFor="">Notes</label>
        <textarea name="" id="userNotes" rows="4" onChange={e => props.updateUserForm(e)} value={props.requestNotes}>
        </textarea>
      </div>
    </div>
    <div className="Form-confirm"></div>
    <div className="Form-agree">
      <button className="cancel" onClick={props.toggleForm}>Cancel</button>
      {props.selectedDate && props.selectedSlot &&
      <button className="ghost" onClick={props.submitRequest}>Submit Request</button>
      }
    </div>
  </div>
)

const Footer = () => (
  <div className="Footer">
    <div className="Footer-forline">
      For <a href="">Well Health</a>
    </div>
    <div className="Footer-byline">
      Everything by <a href="http://clearstreamcreative.com">Josh Kovitz</a> 2018
    </div>
  </div>
)

export default App