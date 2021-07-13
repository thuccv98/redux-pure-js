//Setup Redux store
//state -> reducer -> store
//----------------------------------------------
const { createStore } = window.Redux;// object destructuring

//create state
const inittialState = [
  'Listen to music'
];
//reducer
const hobbyReducer = ( state = inittialState, action ) => {
  switch (action.type) {
    case 'ADD_HOBBY': {
      const newList = [...state];
      newList.push(action.payload);

      return newList;
    }
    default:
      return state;
  }
}
//store
const store = createStore(hobbyReducer);
//---------------------------------------

//Render redux hobby list
const  renderHobbyList = (hobbyList) => {
  //check array exist
  if ( !Array.isArray(hobbyList) || hobbyList.length === 0 ) return;

  const ulElement = document.querySelector('#hobbyListId');
  if (!ulElement) return;//check tag ul exist or not

  //Reset previous content of ul
  ulElement.innerHTML= '';

  for ( const hobby of hobbyList ) {
    const liElement = document.createElement('li');
    liElement.textContent = hobby;

    ulElement.appendChild(liElement);

  }
}

//Render initial hobby list
const initialHobbyList = store.getState();
renderHobbyList(initialHobbyList);

// Handle form submit
const hobbyFormElement = document.querySelector('#hobbyFormId');
if (hobbyFormElement) {
  const handleFormSubmit = (e) => {
    // prevent browser from reloading while subbmit enter
    e.preventDefault();
    const hobbyTextElement = hobbyFormElement.querySelector('#hobbyTextId');
    if(!hobbyTextElement) return;

    console.log('SUBMIT', hobbyTextElement.value);
    const action = {
      type: 'ADD_HOBBY',
      payload: hobbyTextElement.value //data
    }
    store.dispatch(action);// send action to reducer handle

    // reset form
    hobbyFormElement.reset();
  };
  hobbyFormElement.addEventListener('submit', handleFormSubmit);
}

store.subscribe(() => {
  console.log('STATE UPDATE: ', store.getState());
  const newHobbyList = store.getState();
  renderHobbyList(newHobbyList);
})