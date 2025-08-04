import base64 # used for encoding the spotify client ID + secret key together

# this helper function encodes client credentials to pass to spotify
def encode_client_credentials(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET):
  auth_encoded = (SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).encode("utf-8")
  auth_encoded = str(base64.b64encode(auth_encoded), "utf-8")
  return auth_encoded
