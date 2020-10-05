import spotifyApi from 'spotify-web-api-js';
const spotify = new spotifyApi();

const edpoint = 'https://accounts.spotify.com/authorize';
const redirectURI = 'http://localhost:3000/';
const userId = '6b07a615b6fe4f039a264c0ca5586d24';
const scopes = [
  'user-top-read',
  'user-library-read',
  'user-follow-read',
  'user-read-currently-playing',
  'user-read-recently-played',
  'user-read-playback-state',
  'user-top-read',
  'user-modify-playback-state',
];

export const getTokenFromURL = () => {
  return window.location.hash
    .substring(1)
    .split('&')
    .reduce((el, i) => {
      let parts = i.split('=');
      el[parts[0]] = decodeURIComponent(parts[1]);
      return el;
    }, {});
};

export const loginURL = `${edpoint}?client_id=${userId}&redirect_uri=${redirectURI}&scope=${scopes.join(
  '%20',
)}&response_type=token&show_dialog=true`;

export default spotify;
