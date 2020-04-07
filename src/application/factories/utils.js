/* eslint-disable import/prefer-default-export */
export const isRequired = (name) => {
  throw new Error(`function "${name}" is required for Application Service`);
};
