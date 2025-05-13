
/**
 * @returns {function} return middleware function
 * @description Check if the user is authorized or not
 */

export const authorization = (allowedRoles) => {
  return async (req, res, next) => {
    // Get the loggedIn user from the request authUser from auth middleware
    const user = req.authUser;
    
    // Check if the allowed roles array includes the user role
    if (!allowedRoles.includes(user.role)) 
      return res.status(401).json({msg:'You are not allowed to access this route'})
    
    next();
  };
};
