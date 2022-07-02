declare type User = {
  email?: String;
  nickname?: String;
  password?: String;
  passwordConfirm?: String;
};

declare type Data = {
  success: boolean;
  data?: any;
  message?: string;
};

declare type LoginInfo = {
  email?: string;
  password?: string;
};
