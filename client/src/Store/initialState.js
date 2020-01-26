export const initialState = {
  notes: [],

  // Utils
  toastMsg: null,
  loaderActivation: false,
  modalOpen: {
    section: '',
    open: false
  },
  todoForm: {
    executionDate: '',
    title: '',
    description: '',
    priority: 1,
    errors: {}
  }
};
