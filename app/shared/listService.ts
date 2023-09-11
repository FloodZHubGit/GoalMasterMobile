import config from "./config"
import { userStore } from "./store";

var baseUrl = config.apiUrl

export async function register(user: any) {
  const postData = {
    email: user.email,
    password: user.password,
    username: user.username,
  };

  const postOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  };

  try {
    const response = await fetch(`${baseUrl}/accounts`, postOptions);

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function login(user: any) {
  const postData = {
    email: user.email,
    password: user.password,
  };

  const postOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  };

  try {
    const response = await fetch(`${baseUrl}/security/login`, postOptions);

    const responseData = await response.json();
    userStore.set(responseData.res);
    return responseData;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function fetchMatchs() {
  try {
    const response = await fetch(`${baseUrl}/matchs`);

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des matchs");
    }

    const data = await response.json();
    return data.res.items;
  } catch (error) {
    console.error("Erreur lors de la récupération des matchs :", error);
    throw error;
  }
}

export async function fetchMatch(id: string) {
  try {
    const response = await fetch(`${baseUrl}/matchs/${id}`);

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération du match");
    }

    const data = await response.json();

    return data.res;
  } catch (error) {
    console.error("Erreur lors de la récupération du match :", error);
    throw error;
  }
}

export async function fetchUser(id: string) {
  try {
    const response = await fetch(`${baseUrl}/accounts/${id}`);

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération de l'utilisateur");
    }

    const data = await response.json();

    return data.res;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
    throw error;
  }
}