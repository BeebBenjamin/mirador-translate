import { PluginActionTypes } from './actions';

const initialState = {
  viewportWidth: window.innerWidth,
};

export const updateAnnotationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case PluginActionTypes.UPDATE_ANNOTATIONS:
      return {
        ...state,
        [action.targetId]: {
          ...state[action.targetId],
          [action.annotationId]: {
            id: action.annotationId,
            isFetching: false,
            json: action.annotationJson,
          },
        },
      };
    default:
      return state;
  }
};
