
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Admin } from "../models/admin.model.js";
import { validationResult } from "express-validator";


export const signIn = async (request, response, next) => {
  try {
    let admin = await Admin.findOne({ email: request.body.email });
    let status = admin ? await bcrypt.compare(request.body.password, admin.password) : response.status(401).json({ error: "Unauthorise Request", status: false });
    admin = admin?.toObject();
    delete admin?.password;
    return status ? response.status(200).json({ msg: "signin success", result: admin, status: true }) : response.status(401).json({ error: "Bad Request", status: false });
  }
  catch (err) {
    console.log(err);
    return response.status(500).json({ error: "Internal server error", status: false });
  }
}

export const signOut = async (request, response, next) => {
  try {
    let admin = await Admin.findOne({ email: request.body.email });
    let payload = { subject: admin.email };
    let token = jwt.sign(payload, 'fdfxvcvnreorevvvcrerer');
    return response.status(200).json({ status: true, msg: "Admin Signout successfully........", token: token, status: true });
  } catch (err) {
    console.log(err);
    return response.status(500).json({ msg: "Internal Server Error", status: false });
  }
}

export const viewProfile = async (request, response, next) => {
  try {
    let admin = await Admin.findOne({ email: request.params.email });
    console.log(admin);
    return response.status(200).json({ status: true, msg: "Admin Profile........", token: admin, status: true });
  } catch (err) {
    console.log(err);
    return response.status(500).json({ msg: "Internal server error", status: false });
  }
}

export const editProfile = async (request, response, next) => {
  try {
    const adminEmail = request.body.email;
    const admin = await Admin.findOne({ email: adminEmail });
    if (!admin) {
      return response.status(404).json({ msg: "Admin not found", status: false });
    }

    admin.email = request.body.updateEmail;
    await admin.save();
    console.log(admin);
    return response.status(200).json({ admin: admin, msg: "Admin Profile updated successfully......", status: true });
  } catch (err) {
    console.log(err);
    return response.status(500).json({ msg: "Internal Server Error", status: false });
  }
}

export const changePassword = async (request, response, next) => {
  try {
    const adminEmail = request.params.email;
    const admin = await Admin.findOne({email:adminEmail});
    const { oldPassword, newPassword, confirmPassword } = request.body;
    console.log(request.body);
    if (!admin) {
      return response.status(404).json({ msg: "Admin not found", status: false });
    }
    const isMatch = await bcrypt.compare(oldPassword, admin.password);
    if (!isMatch) {
      return response.status(401).json({ msg: "Incorrect password", status: false });
    }
    if (newPassword !== confirmPassword) {
      return response.status(400).json({ msg: "Passwords do not match", status: false });
    }
    let saltKey = await bcrypt.genSalt(10);
    let encryptedPassword = await bcrypt.hash(newPassword, saltKey);
    admin.password = encryptedPassword;
    await admin.save();
    console.log(admin);
    return response.status(200).json({ status: true, msg: "Password changed successfully" });
  } catch (err) {
    console.log(err);
    return response.status(500).json({ msg: "Internal Server Error", status: false });
  }
}

export const saveAdmin = async (request, response) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty())
      return response.status(400).json({ msg: "Bad request", status: false, errors: errors.array() });
    const saltKey = await bcrypt.genSalt(10);
    request.body.password = await bcrypt.hash(request.body.password, saltKey);

    let admin = await Admin.create(request.body);
    return response.status(200).json({ msg: "Data Saved Successfully", admin: admin, status: true });


  }
  catch (err) {
    console.log(err);

  }
}

