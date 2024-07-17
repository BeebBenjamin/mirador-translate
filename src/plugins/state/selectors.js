import { miradorSlice } from 'mirador/dist/es/src/state/selectors/utils';

export const getAnnotations = (state) => miradorSlice(state).annotations;
