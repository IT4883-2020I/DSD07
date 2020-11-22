import axios from 'axios';

const AUTH_BASE_API = 'https://distributed.de-lalcool.com'

const verifyToken = async (req, res, next) => {
  let token;
  let projectType;

  token = req.headers['api-token'] || '';
  projectType = req.headers['project-type'] || '';
  try {
    const { data: { result } } = await axios.get(
      `${AUTH_BASE_API}/api/verify-token`,
      {
        headers: {
          'api-token': token,
          'project-type': projectType
        }
      }
    );
    const { password, api_token, ...user } = result; // -_-
    req.user = user;
    next();
  } catch (e) {
    const { response: { data: { message }, status } } = e;
    res.status(status);
    next(new Error(message));
  }
};

export {
  verifyToken
}