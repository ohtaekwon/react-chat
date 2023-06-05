import bcrypt from "bcrypt";
import userModel from "../models/user.model.js";

const updateUser = async (req, res) => {
  try {
    const {
      body: { userId, isAdmin, password },
      params: { id },
    } = req;

    if (userId === id || isAdmin) {
      if (password) {
        try {
          const salt = await bcrypt.genSalt(10);
          password = bcrypt.hash(password, salt);
        } catch (error) {
          return res.status(500).json(error);
        }
      }

      const user = await userModel.findByIdAndUpdate(id, {
        $set: body,
      });
      res.status(200).json("이미 수정되었습니다");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteUser = async (req, res) => {
  const {
    body: { userId, isAdmin },
    params: { id },
  } = req;

  if (userId === id || isAdmin) {
    try {
      await userModel.findByIdAndDelete(id);
      return res.status(200).json("삭제 되었습니다.");
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json("본인의 회원만 삭제가 가능합니다.");
  }
};

const getUser = async (res, req) => {
  const {
    query: { userId, username },
  } = req;

  try {
    const user = userId
      ? await userModel.findById(userId)
      : await userModel.findOne({ username: username });

    const { password, updatedAt, ...other } = user._doc;
    return res.status(200).json(other);
  } catch (error) {
    return res.status(500).json(error);
  }
};
