import Joi from '@hapi/joi';
import {
  loginRegisterValidation,
  phoneNumberValidation,
  requiredRegNumberValidation,
  requiredStringValidation,
} from './common';

const registerBank = Joi.object({
  paymentPlan: Joi.number().messages({
    'number.base': 'Email must be a string',
  }),
  accountHolderName: requiredStringValidation('bankDetail.accountHolderName'),
  accountNumber: requiredStringValidation('bankDetail.accountNumber'),
  accountSortCode: requiredStringValidation('bankDetail.accountSortCode'),
});

const profileReg = Joi.object({
  dob: requiredStringValidation('dob'),
});

const RegisterUser = Joi.object({
  title: requiredStringValidation('title'),
  firstName: requiredStringValidation('firstName'),
  lastName: requiredStringValidation('lastName'),
  // dob: Joi.date().iso().required().messages({
  //   'any.required': 'dob is required',
  // }),
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a string',
    'string.email': 'Email is invalid',
    'any.required': 'Email is required',
  }),
  phone: phoneNumberValidation(),
  referralCode: requiredStringValidation('referralCode'),
});

export { RegisterUser };
