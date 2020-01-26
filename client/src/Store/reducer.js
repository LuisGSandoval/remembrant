export const reducer = (state, action) => {
  switch (action.type) {
    //******************************* */
    //*             NOTES             */
    //******************************* */

    // Update the form to create a note
    case 'NOTE_FORM_UPDATE':
      return {
        ...state,
        todoForm: action.payload
      };
    case 'LOAD_NOTE_LIST':
      return {
        ...state,
        notes: action.payload
      };

    //******************************* */
    //*            UTILS             */
    //******************************* */

    // Spining utils that shows a loading state of the data
    case 'LOADER_ACTIVATION':
      return {
        ...state,
        loaderActivation: action.payload
      };

    // It's the alert message that tells the user everything of the app
    case 'UPDATE_TOAST_MESSAGE':
      return {
        ...state,
        toastMsg: action.payload
      };

    //******************************* */
    //*      MODAL ACTIVATION         */
    //******************************* */

    case 'MODAL_TOGGLE':
      return {
        ...state,
        modalOpen: action.payload
      };

    //******************************* */
    //*       ERROR VALIDATION        */
    //******************************* */

    default:
      return Error('Context reducer error');
  }
};
