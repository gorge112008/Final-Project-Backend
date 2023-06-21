const validateSession = async (req, res, next) => {
  try {
    const session = req.session.user;
    if(session){
        res.locals.resSession=session;
      next();
    }else{
      return res.status(401).render("redirection", { isLogin: true });
    }
  } catch (error) {
    next(error);
  }
};

export default validateSession;
