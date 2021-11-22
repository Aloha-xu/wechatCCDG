'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {

  async addComment() {
    const result = await this.app.mysql.insert('comment', this.ctx.request.body)
    //1 插入成功
    const insertSuccess = result.affectedRows === 1
    const insertId = result.insertId
    console.log("返回的id" + insertId)
    this.ctx.body = {
      isScuccess: insertSuccess,
      insertId: insertId
    }
  }

  async addLikeCount() {
    console.log(this.ctx.request.body)
    let sql = "UPDATE article SET likeCount = " + this.ctx.request.body.likeCount + "  WHERE id = " + this.ctx.request.body.id;
    const result = await this.app.mysql.query(sql)
    this.ctx.body = { data: result }
  }

  async getArticleList() {
    let sql = 'SELECT * FROM article order by id desc'
    let result = await this.app.mysql.query(sql)
    //拿到动态的id数组
    let id = result.map(({ id }) => id)
    //每一个id去找对应的comment
    for (let i = 0; i < id.length; i++) {
      let commentResult = await this.app.mysql.query('SELECT * FROM comment WHERE id=' + id[i])
      result[i].comment = commentResult
      console.log(commentResult)
    }
    console.log(result)
    this.ctx.body = { data: result }
  }

  async addArticle() {
    const result = await this.app.mysql.insert('article', this.ctx.request.body)
    const insertSuccess = result.affectedRows === 1
    const insertId = result.insertId
    console.log("返回的id" + insertId)
    this.ctx.body = {
      isScuccess: insertSuccess,
      insertId: insertId
    }
  }
}

module.exports = HomeController;
