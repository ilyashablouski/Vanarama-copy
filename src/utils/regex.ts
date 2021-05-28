export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

export const WORLDWIDE_MOBILE_REGEX = /^((\+[0-9]+(0|\(0\)|\s0\s|\s)?)|0)[0-9]+\d{3}(\s)?\d{6}/;

export const UK_MOBILE_REGEX = /^((\+44(0|\(0\)|\s0\s|\s)?)|0)7\d{3}(\s)?\d{6}/;

export const NAME_REGEX = /^^[a-zA-Z'-\s]+$/;

export const COMPANY_REGISTRATION_NUMBER = /^([a-z]|\d){8}$/i;

export const POSTCODE_REGEX = /^[\w\s]+$/;

export const NUMBERS_REGEX = /^[0-9]*$/;

export const LETTERS_AND_NUMBERS_REGEX = /^[a-zA-Z0-9]*$/;

export const POSTCODE_NORTHERN_IRELAND_REGEXP = /BT\d{1,2}\s?\d[A-Z]{2}/i;
