import { PrismaClient } from "@prisma/client";
import Joi from "joi";

const prisma = new PrismaClient();

const getLogins = async (req, res) => {
  try {
    const query = {
      
    };

    if (req.query.email || req.query.name ) {
      query.where = {
        email: {
          in: req.query.email || undefined,
        },
        name: {
          in: req.query.name || undefined,
        },
      
      };
    }

    const logins = await prisma.login.findMany(query);

    if (logins.length === 0) {
      return res.status(200).json({ msg: "No login found" });
    }

    return res.json({
      data: logins,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};
const loginSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  
  const createLogin = async (req, res) => {
    try {
      const { error, value } = loginSchema.validate(req.body);
  
      if (error) {
        return res.status(400).json({
          msg: error.details[0].message,
        });
      }
  
      const { name, email, password } = value; // destructuring validated object
  
      await prisma.login.create({
        data: { name, email, password },
      });
  
      const newLogins = await prisma.login.findMany();
  
      return res.status(201).json({
        msg: "Login successfully created",
        data: newLogins,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };
  const upDateLogin = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;
  
      let login = await prisma.login.findUnique({
        where: { id: Number(id) },
      });
  
      if (!login) {
        return res
          .status(201)
          .json({ msg: `No login with the id: ${id} found` });
      }
  
      login = await prisma.login.update({
        where: { id: Number(id) },
        data: { name, email, password },
      });
  
      return res.json({
        msg: `Login with the id: ${id} successfully updated`,
        data: login,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };
  const deleteLogin = async (req, res) => {
    try {
      const { id } = req.params;
  
      const login = await prisma.login.findUnique({
        where: { id: Number(id) },
      });
  
      if (!login) {
        return res
          .status(200)
          .json({ msg: `No login with the id: ${id} found` });
      }
  
      await prisma.login.delete({
        where: { id: Number(id) },
      });
  
      return res.json({
        msg: `Login with the id: ${id} successfully deleted`,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };
  const getLogin = async (req, res) => {
    try {
      const { id } = req.params;
  
      const login = await prisma.login.findUnique({
        where: { id: Number(id) },
      });
  
      if (!login) {
        return res
          .status(200)
          .json({ msg: `No login with the id: ${id} found` });
      }
  
      return res.json({
        data: login,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };
  export {
    getLogin, 
    getLogins, 
    createLogin,
    upDateLogin,
    deleteLogin
  };