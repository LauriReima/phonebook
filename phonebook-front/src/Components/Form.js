import React from 'react'

const Form = ({addPerson, state, handleChangeName, handleChangeNumber}) => {
  return (
    <>
    <form onSubmit={addPerson}>
          <label htmlFor ="name">nimi:</label> 
          <input
              value={state.newName}
              onChange={handleChangeName} 
              name="name"/>
          
          <label htmlFor='number'> numero: </label>
          <input
              value={state.newNumber}
              onChange={handleChangeNumber} 
              name='number'/>
          
          <div>
            <button type="submit" className='subNappi'>lisää</button>
          </div>
        </form>
    </>
  )
}

export default Form