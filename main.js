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
  return state;
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