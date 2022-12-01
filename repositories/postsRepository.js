const { Post } = require("../models");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


class PostsRepository {
  static async create({ user_id, title, description }) {
    const createdPost = Post.create({
      user_id,
      title,
      description,
    });

    return createdPost;
  }

  static async getAll() {
    const getPost = await Post.findOne({
      where: {
        deletedAt: {
          [Op.eq]: null
        }
      }
    });

    return getPost;
  }

  static async getByID({ id }) {
    const getPost = await Post.findOne({
      where: {
        id: id,
        deletedAt: {
          [Op.ne]: null
        }
      }
    });

    return getPost;
  }

  static async deleteByID({ id, userID }) {
    const deletedPost = await Post.update(
      {
        deletedAt: new Date().getTime(),
        deletedBy: userID
      },
      { where: { id } });

    return deletedPost;
  }

  static async updateByID({ id, title, description }) {
    const updatedPost = await Post.update(
      {
        title,
        description,
      },
      { where: { id } }
    );

    return updatedPost;
  }
}

module.exports = PostsRepository;
