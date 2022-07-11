export const DELETE_ENTITY = 'DELETE';
export const UPDATE_ENTITY = 'UPDATE';
export const READ_ENTITY = 'READ';
export const CREATE_ENTITY = 'CREATE';
export const LOGIN_USER = 'LOGIN';
export const LOGOUT_USER = 'LOGOUT';

export const SuccessApiResponse = function sucessApiResponse(
  operation: string,
  entityName: string,
  moreResponseInfo: any = {},
) {
  return { operation, on: entityName, satus: true, ...moreResponseInfo };
};

export const FailureApiResponse = function failureApiResponse(
  operation: string,
  entityName: string,
  moreResponseInfo: any = {},
) {
  return { operation, entityName, status: false, ...moreResponseInfo };
};
