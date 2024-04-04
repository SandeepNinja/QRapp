const API_ROOT = process.env.REACT_APP_API_ROOT;

export const API_URL = {
  login: () => `${API_ROOT}/login`,
  signup: () => `${API_ROOT}/signup`,
  fetchResetPasswordThroughEmail:() => `${API_ROOT}/forget`,
  generateOTP:() =>  `${API_ROOT}/generateOTP`,
  fetUserData: () => `${API_ROOT}/userData`,
  createDirectory: (id) => `${API_ROOT}/dynamicqr/${id}/createnew`,
  addLink: (id,directoryId) => `${API_ROOT}/dynamicqr/${id}/directory/${directoryId}`,
  directoryDetails:(directoryId) => `${API_ROOT}/dynamicqr/directoryDetails/${directoryId}`,
  directoryDelete:(directoryId) => `${API_ROOT}/dynamicqr/directorydelete/${directoryId}`,
  linkDelete:(linkId) => `${API_ROOT}/dynamicqr/linkdelete/${linkId}`,
  linkUpdate:(linkId) =>  `${API_ROOT}/dynamicqr/linkupdate/${linkId}`,
  updateDirectory:(directoryId) =>  `${API_ROOT}/dynamicqr/directoryupdate/${directoryId}`,
  updateProfile:(id) =>  `${API_ROOT}/dynamicqr/updateprofile/${id}`,
  fetchResetPassword:(id) =>  `${API_ROOT}/reset/${id}`,
};
