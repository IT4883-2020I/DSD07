import axios from 'axios';
import serviceApis from '../config/service_apis.js';

const { AUTH_BASE_API } = serviceApis;

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

const admin = (req, res, next) => {
  if (req.user && req.user.role === 'ADMIN') {
    next();
  } else {
    res.status(403);
    next(new Error('Forbidden: Not authorized as an ADMIN'))
  }
}

const manager = (req, res, next) => {
  if (req.user && req.user.role === 'MANAGER') {
    next();
  } else {
    res.status(403);
    next(new Error('Forbidden: Not authorized as a MANAGER'))
  }
}

const nonStaff = (req, res, next) => {
  if (req.user && ['MANAGER', 'ADMIN', 'SUPER_ADMIN', 'SUPERADMIN'].includes(req.user.role)) {
    next();
  } else {
    res.status(403);
    next(new Error('Forbidden: Not authorized as MANAGER or ADMIN or SUPER_ADMIN'));
  }
}

export {
  verifyToken,
  admin,
  manager,
  nonStaff
}