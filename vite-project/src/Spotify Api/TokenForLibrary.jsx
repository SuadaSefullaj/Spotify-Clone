import { getTokenFromUrl } from "./SpotifyLogin"; 

// Function to get the access token from the URL
export const getAccessToken = () => {
  const { access_token } = getTokenFromUrl();
  return access_token;
};
