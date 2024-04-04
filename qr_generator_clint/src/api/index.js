import { API_URL } from "../utils/constants";

const customFetch = async (url, { body, ...customConfig }) => {
  //   const token = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  const headers = {
    "content-type": "application/json",
  };
  //   if (token) {
  //     headers.Authorization = `Bearer ${token}`;
  //   }

  const config = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig,
    },
  };
  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const responses = await fetch(url, config);
    const data = await responses.json();
    // console.log("custom fetch reponse: ", data);
    return {
      data,
    };
  } catch (error) {
    console.error("error");
    return {
      error,
    };
  }
};

export const signup = async (name, email, password, otp) => {
  return customFetch(API_URL.signup(), {
    method: "POST",
    body: { name, email, password, otp },
  });
};

export const login = async (email, password) => {
  return customFetch(API_URL.login(), {
    method: "POST",
    body: { email, password },
  });
};

export const fetchUser = (id) => {
  // console.log("id in fetchUser data:: ", id);
  return customFetch(API_URL.fetUserData(), {
    method: "POST",
    body: { id },
  });
};

export const createNewDirectory = (id, name, logo) => {
  // console.log("create new api : ", id);
  return customFetch(API_URL.createDirectory(id),{
    method: "POST",
    body: {name, logo},
  })
}
export const addLinkInDirectory = (userid,directoryId, name,link, linkLogo) => {
  // console.log("create new api : ", userid, " :: " ,directoryId);
  return customFetch(API_URL.addLink(userid,directoryId),{
    method: "POST",
    body: {name, linkLogo, link},
  })
}

export const fetchDirectory = (directoryId) => {
  return customFetch(API_URL.directoryDetails(directoryId),{
    method:"GET",
  })
}

export const deleteLink = (linkId) => {
  return customFetch(API_URL.linkDelete(linkId),{
    method:"GET",
  })
}
export const deleteDirectory = (directoryId) => {
  return customFetch(API_URL.directoryDelete(directoryId),{
    method:"GET",
  })
}

export const linkUpdate = (id,name, link, linkLogo) => {
  return customFetch(API_URL.linkUpdate(id),{
    method:"POST",
    body:{name, link, linkLogo}
  })
}

export const updateDirectory = (id, name, logo) => {
  return customFetch(API_URL.updateDirectory(id),{
    method:"POST",
    body:{name, logo}
  })
}

export const updateProfile = (id, name, avatar) => {
  return customFetch(API_URL.updateProfile(id),{
    method:"POST",
    body:{name,avatar}
  })
}

export const fetchResetPassword = (id, oldPassword, newPassword) => {
  return customFetch(API_URL.fetchResetPassword(id),{
    method:"POST",
    body:{oldPassword,newPassword}
  })
}

export const fetchResetPasswordThroughEmail = (email) => {
  // console.log("api",email)
  return customFetch(API_URL.fetchResetPasswordThroughEmail(),{
    method:"POST",
    body:{"email":email}
  })
} 

export const generateOTP = (email) => {
  // console.log("generate api:", email);
  return customFetch(API_URL.generateOTP(),{
    method:"POST",
    body:{"email":email}
  })
}