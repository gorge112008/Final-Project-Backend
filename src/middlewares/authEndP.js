export const authEndp = {
  Admin: function async(req, res, next) {
    try {
      if (req.user.role !== "admin") {
        const err = { error: "Authentication Error!" };
        return res.status(401).json(err);
      } else {
        next();
      }
    } catch (error) {
      const err = { error: "Internal Server Error" };
      return res.status(500).json(err);
    }
  },
  User: function async(req, res, next) {
    try {
      const {role}=req.session.user;
      if (role !== "user") {
        const err = { error: `Sorry, ${role} are not authorized!!!` };
        return res.status(403).json(err);
      } else {
        next();
      }
    } catch (error) {
      const err = { error: "Internal Server Error" };
      return res.status(500).json(err);
    }
  },
  Public: function async(req, res, next) {
    try {
        next();
        } catch (error) {
        const err = { error: "Internal Server Error" };
        return res.status(500).json(err);
        }
    },
    Public2: function async(req, res, next) {
        try {
            next();
            } catch (error) {
            const err = { error: "Internal Server Error" };
            return res.status(500).json(err);
            }
        }
};
