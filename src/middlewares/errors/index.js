import EErrors from "../../services/errors/enum.js";
const errorHandler = (error, req, res, next) => {
  req.logger.error("ERROR--> "+error.message+": "+"\n"+error.cause);
  switch (error.code) {
    case EErrors.API_ERROR:
      res.status(500).send({
        status: 500,
        error: error.name,
      });
      break;
    case EErrors.AUTHENTICATION_ERROR:
      res.status(401).send({
        status: 401,
        error: error.name,
      });
      break;
    case EErrors.AUTHORIZATION_ERROR:
      res.status(403).send({
        status: 403,
        error: error.name,
      });
      break;
    case EErrors.BAD_GATEWAY_ERROR:
      res.status(502).send({
        status: 502,
        error: error.name,
      });
      break;
    case EErrors.BAD_REQUEST_ERROR:
      res.status(400).send({
        status: 400,
        error: error.name,
      });
      break;
    case EErrors.CONFLICT_ERROR:
      res.status(409).send({
        status: 409,
        error: error.name,
      });
      break;
    case EErrors.DATABASE_ERROR:
      req.logger.fatal("Need Attention Priority 2: DATABASE_ERROR");
      res.status(500).send({
        status: 500,
        error: error.name,
      });
      break;
    case EErrors.FORBIDDEN_ERROR:
      res.status(403).send({
        status: 403,
        error: error.name,
      });
      break;
    case EErrors.GATEWAY_TIMEOUT_ERROR:
      res.status(504).send({
        status: 504,
        error: error.name,
      });
      break;
    case EErrors.INTERNAL_SERVER_ERROR:
      res.status(500).send({
        status: 500,
        error: error.name,
      });
      break;
    case EErrors.INVALID_TYPES_ERROR:
      res.status(400).send({
        status: 400,
        error: error.name,
      });
      break;
    case EErrors.NOT_FOUND_ERROR:
      res.status(404).send({
        status: 404,
        error: error.name,
      });
      break;
    case EErrors.NOT_IMPLEMENTED_ERROR:
      res.status(501).send({
        status: 501,
        error: error.name,
      });
      break;
    case EErrors.PAYMENT_REQUIRED_ERROR:
      req.logger.fatal("Need Attention Priority 1: PAYMENT_REQUIRED_ERROR");
      res.status(402).send({
        status: 402,
        error: error.name,
      });
      break;
    case EErrors.PRECONDITION_FAILED_ERROR:
      res.status(412).send({
        status: 412,
        error: error.name,
      });
      break;
    case EErrors.SERVICE_UNAVAILABLE_ERROR:
      res.status(503).send({
        status: 503,
        error: error.name,
      });
      break;
    case EErrors.TOO_MANY_REQUESTS_ERROR:
      res.status(429).send({
        status: 429,
        error: error.name,
      });
      break;
    case EErrors.UNAUTHORIZED_ERROR:
      res.status(401).send({
        status: 401,
        error: error.name,
      });
      break;
    case EErrors.UNPROCESSABLE_ENTITY_ERROR:
      res.status(422).send({
        status: 422,
        error: error.name,
      });
      break;
    default:
      res.status(500).send({
        status: 500,
        error: "unhandled error",
      });
  }
};

export default errorHandler;
