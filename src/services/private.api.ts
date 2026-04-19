import instance from "../lib/axios";

/*
  User Onboarding Component APIs - APIs Used in User Onboarding Component
*/
const onboarding_userLogin = async (params: object) => {
  return await instance.clientOnboarding.post("/login", params, {
    headers: instance.defaultHeaders(),
  });
};

/*
  End of User Onboarding Component APIs - End of APIs Used in User Onboarding Component
*/

const privateAPI = {
  /*
    Start of User Onboarding Components APIs - APIs Used in User Onboarding Components
  */
  onboarding_userLogin,
  /*
    End of User Onboarding Components APIs - APIs Used in User Onboarding Components
  */
};

export default privateAPI;
