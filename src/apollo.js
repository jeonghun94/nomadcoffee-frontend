import { makeVar, ApolloClient, InMemoryCache } from "@apollo/client";
const TOKEN = "token";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));
export const path = makeVar("");

export const userLogin = (token) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

export const userLogout = () => {
  localStorage.removeItem(TOKEN);
  window.location.reload();
};

export const darkModeVar = makeVar(false);
export const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://instaclone-backend-jh.herokuapp.com/graphql"
      : "http://localhost:4000/graphql",
  //   url: "https://instaclone-backend-jh.herokuapp.com/graphql",
  cache: new InMemoryCache(),
  headers: {
    token: localStorage.getItem(TOKEN),
  },
});
