const { SET_ACTIVE_TAB } = require('../action-types');

const defaultState = {
  activeTab: 'apps',
};

const navigation = (state = defaultState, action) => {
  switch (action.type) {
    case SET_ACTIVE_TAB:
      return {
        activeTab: action.payload,
      };
    default:
      return state;
  }
};

export default navigation;
