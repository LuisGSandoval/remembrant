export const initialState = {
  transactions: [],
  notes: [],

  // Utils
  toastMsg: null,
  loaderActivation: false,
  modalOpen: {
    section: '',
    open: false,
  },
  updateMode: false,

  // Notes state
  sortBy: {
    finished: 'none',
    type: 'priority',
  },
  noteId: '',
  noteDetails: null,
  todoForm: {
    executionDate: '',
    title: '',
    description: '',
    priority: 1,
    errors: {},
  },
};
