module.exports = app => {
    const { router, controller } = app;
    router.get('/getArticleList', controller.home.getArticleList);
    router.get('/getArticleById', controller.home.getArticleById);
    router.post('/addArticle', controller.home.addArticle);
    router.post('/addComment', controller.home.addComment);
    router.get('/getCommentById/:id', controller.home.getCommentById);
  };