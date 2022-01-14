
const filterReducer = (state='', action) => {
  switch (action.type) {
    case 'CHANGE_FILTER':
      return action
        .data
        .filter
        .toLowerCase()
    default:
      return state
  }
}

export const changeFilter = filter => {
  return {
    type: 'CHANGE_FILTER',
    data: { filter }
  }
}

export default filterReducer