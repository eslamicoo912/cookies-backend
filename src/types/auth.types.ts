import { Types } from "mongoose";

export interface PatientType {
  _id: Types.ObjectId;
  name?: string;
  email?: string;
  password?: string;
  tokens?: string[];
  OTP?: string;
  paymentToken?: string;
  isConfirmEmail?: boolean;
  role?: "Patient";
  createdAt?: Date;
  updatedAt?: Date;
  save?(): Promise<void>;
}
export type SignUpUserType = {
  name: string;
  email: string;
  password: string;
  role: "Doctor" | "Patient";
  specializations?: Types.ObjectId[];
  qualifications?: string[];
  yearsOfExperience?: number;
  address?: string;
  phoneNumber?: string;
  title?: string;
  gender?: "male" | "female";
  pricePerHour?: Number;
  pricePerHalfHour?: Number;
  pricePerHourInUSD?: Number;
  pricePerHalfHourInUSD?: Number;
};
enum Roles {
  ADMIN = "Admin",
  DOCTOR = "Doctor",
  PATIENT = "Patient",
}

export type DoctorType = {
  _id?: Types.ObjectId;
  name?: string;
  email?: string;
  password?: string;
  tokens?: string[];
  OTP?: string;
  role?: "Doctor";
  isDoctorConfirmed?: boolean;
  isEmergencyDoctor?: boolean;
  specializations?: Types.ObjectId[];
  qualifications?: string[];
  yearsOfExperience?: number;
  address?: string;
  online?: boolean;
  phoneNumber?: string;
  title?: string;
  gender?: "male" | "female";
  pricePerHour?: Number;
  pricePerHalfHour?: Number;
  createdAt?: Date;
  updatedAt?: Date;
  save?(): Promise<void>;
};
export type UserType = {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  tokens?: string[];
  role: "User" | "Admin";
  status: "active" | "inactive";
  save?(): Promise<void>;
};

export type VerifyOTPType = {
  userId: Types.ObjectId;
  OTP: string;
  confirmationType: "signup" | "forgetpassword";
};

export type LoginType = {
  email: string;
  password: string;
};
