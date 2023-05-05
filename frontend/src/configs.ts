export const IS_PROD = import.meta.env.PROD;
export const SERVER_ORIGIN = IS_PROD ? '' : getDefaultServerOrigin();
export const USE_SOCKET = false;
export const USE_SPA = true;

function getDefaultServerOrigin(port = 3000) {
  const { protocol, hostname } = window.location;
  return `${protocol}//${hostname}:${port}`;
}
