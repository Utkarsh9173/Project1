// import JoiBase from "@hapi/joi";
import Joi from '@hapi/joi';
import { errorCodes } from "@config/responseCodes";

// const Joi = JoiBase.extend(JoiDate); // extend Joi with Joi Date

export namespace TreesValidator {

  export const validateCreatePlantTree = Joi.object({
    firstName: Joi.string().allow(null, '').error((errors: any) => {
        errors.forEach((err: any) => {
          if (err.code === "any.required") {
            err.message = errorCodes.FIRST_NAME_REQUIRED;
          } else {
            err.message = errorCodes.FIRST_NAME_INVALID;
          }
        });
        return errors;
      }),
    email: Joi.string().email().required().error((errors: any) => {
      errors.forEach((err: any) => {
        if (err.code === "any.required") {
          err.message = errorCodes.USER_ID_REQUIRED;
        } else {
          err.message = errorCodes.USER_ID_INVALID;
        }
      });
      return errors;
    }),
    quantity: Joi.number().integer().required().error((errors: any) => {
      errors.forEach((err: any) => {
        if (err.code === "any.required") {
          err.message = errorCodes.STATUS_REQUIRED;
        } else {
          err.message = errorCodes.STATUS_INVALID;
        }
      });
      return errors;
    }),
    requestType: Joi.number().integer().required().error((errors: any) => {
        errors.forEach((err: any) => {
          if (err.code === "any.required") {
            err.message = errorCodes.STATUS_REQUIRED;
          } else {
            err.message = errorCodes.STATUS_INVALID;
          }
        });
        return errors;
      }),
      senderName: Joi.string().allow(null, '').error((errors: any) => {
        errors.forEach((err: any) => {
          if (err.code === "any.required") {
            err.message = errorCodes.SENDER_NAME_REQUIRED;
          } else {
            err.message = errorCodes.SENDER_NAME_INVALID;
          }
        });
        return errors;
      }),
      typeSlug: Joi.string().allow(null, '').error((errors: any) => {
        errors.forEach((err: any) => {
          if (err.code === "any.required") {
            err.message = errorCodes.TYPE_SLUG_REQUIRED;
          } else {
            err.message = errorCodes.TYPE_SLUG_INVALID;
          }
        });
        return errors;
      }),

    });
}