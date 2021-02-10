import axios from "axios";

const baseUrl = "https://codecool-moving-motivators.herokuapp.com";

// card-list-controller
export const getCardList = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/card-list/${id}`);
    const data = await response.data;
    return data;
  } catch (error) {
    alert(error);
  }
};

// login-controller
export const login = async ({ email, password }) => {
  try {
    const response = await axios.post(`${baseUrl}/login/`, { email, password });
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error.response);
    alert("Wrong email or password!");
  }
};

// notification-controller
export const acceptInvite = async (notificationDto) => {
  try {
    const response = await axios.put(
      `${baseUrl}/notification/accept`,
      notificationDto
    );
    const data = await response.data;
    return data;
  } catch (error) {
    alert("There's no invite to accept!");
  }
};

export const declineInvite = async (notificationDto) => {
  try {
    const response = await axios.delete(
      `${baseUrl}/notification/decline`,
      notificationDto
    );
    const data = await response.data;
    return data;
  } catch (error) {
    alert("There's no invite to decline!");
  }
};

export const newInvite = async (notificationDto, receiverId) => {
  try {
    const response = await axios.post(
      `${baseUrl}/notification/new/${receiverId}`,
      notificationDto
    );
    const data = await response.data;
    return data;
  } catch (error) {
    alert("There's no such group or user!");
  }
};

export const getReceivedNotifications = async () => {
  try {
    const response = await axios.get(`${baseUrl}/notification/received/`);
    const data = await response.data;
    return data;
  } catch (error) {
    alert("Your received notifications are not available!");
  }
};

export const getSentNotifications = async () => {
  try {
    const response = await axios.get(`${baseUrl}/notification/sent/`);
    const data = await response.data;
    return data;
  } catch (error) {
    alert("Your sent notifications are not available!");
  }
};

// question-controller
export const createQuestion = async (questionDto) => {
  try {
    const response = await axios.post(`${baseUrl}/question/`, questionDto);
    const data = await response.data;
    return data;
  } catch (error) {
    alert("Failed to create question!");
  }
};

export const getQuestion = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/question/${id}`);
    const data = await response.data;
    return data;
  } catch (error) {
    alert("Failed to get question!");
  }
};

export const getQuestions = async (ids) => {
  const allResponses = await Promise.allSettled(
    ids.map((id) => axios.get(`${baseUrl}/question/${id}`))
  );
  return allResponses
    .filter((res) => res.status === "fulfilled")
    .map((res) => res.value.data);
};

export const getAllQuestions = async (groups) => {
  const everyGroupsResponse = await Promise.allSettled(
    groups.map((group) => getQuestions(group.questionIds))
  );
  return everyGroupsResponse
    .filter((res) => res.status === "fulfilled")
    .map((res) => res.value);
};

export const deleteQuestion = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/question/${id}`);
    const data = await response.data;
    return data;
  } catch (error) {
    alert("Failed to delete question!");
  }
};

export const setAnswer = async (id, cards) => {
  try {
    const response = await axios.post(
      `${baseUrl}/question/${id}/answer`,
      cards
    );
    const data = await response.data;
    return data;
  } catch (error) {
    alert("Failed to set an answer to the question!");
  }
};

export const closeQuestion = async (id) => {
  try {
    const response = await axios.put(`${baseUrl}/question/${id}/close`);
    const data = await response.data;
    return data;
  } catch (error) {
    alert("Failed to close the question!");
  }
};

export const editNote = async (id, note) => {
  try {
    const response = await axios.put(`${baseUrl}/question/${id}/note`, note);
    const data = await response.data;
    return data;
  } catch (error) {
    alert("Failed to edit the note to the question!");
  }
};

// question-group-controller
export const createQuestionGroup = async (name) => {
  try {
    const response = await axios.post(`${baseUrl}/question-group/`, name, {
      headers: { "Content-Type": "text/plain" },
    });
    const data = await response.data;
    return data;
  } catch (error) {
    alert("Failed to create question group!");
  }
};

export const getQuestionGroup = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/question-group/${id}`);
    const data = await response.data;
    return data;
  } catch (error) {
    alert("Failed to get question group!");
  }
};

export const getQuestionGroups = async (ids) => {
  const allResponses = await Promise.allSettled(
    ids.map((id) => axios.get(`${baseUrl}/question-group/${id}`))
  );
  return allResponses
    .filter((res) => res.status === "fulfilled")
    .map((res) => res.value.data);
};

export const editName = async (id, name) => {
  try {
    const response = await axios.put(`${baseUrl}/question-group/${id}`, {
      name,
    });
    const data = await response.data;
    return data;
  } catch (error) {
    alert("Failed to edit the name of the question group!");
  }
};

export const deleteQuestionGroup = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/question-group/${id}`);
    const data = await response.data;
    return data;
  } catch (error) {
    alert("Failed to delete question group!");
  }
};

export const viewInvited = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/question-group/${id}/invited`);
    const data = await response.data;
    return data;
  } catch (error) {
    alert("Failed to get the invited list to the question group!");
  }
};

// register-controller
export const registerUser = async (user) => {
  try {
    const response = await axios.post(`${baseUrl}/register/`, user);
    const data = await response.data;
    return data;
  } catch (error) {
    alert("Failed to register new user!");
  }
};

// user-controller
export const editUser = async (userDto) => {
  try {
    const response = await axios.put(`${baseUrl}/user/`, userDto);
    const data = await response.data;
    return data;
  } catch (error) {
    alert("Failed to edit user!");
  }
};

export const getUser = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/user/${id}`);
    const data = await response.data;
    return data;
  } catch (error) {
    alert("Failed to get user!");
  }
};

export const saveDefault = async (list) => {
  try {
    const response = await axios.put(`${baseUrl}/user/save-default`, list);
    const data = await response.data;
    return data;
  } catch (error) {
    alert("Failed to save default card list!");
  }
};

export const searchUser = async (name) => {
  try {
    const response = await axios.get(`${baseUrl}/user/search?search=${name}`);
    const data = await response.data;
    return data;
  } catch (error) {
    alert("Failed to search for user!");
  }
};
