module.exports = app => {
    const { router, controller } = app;
    router.get('/getArticleList', controller.home.getArticleList);
    router.post('/addLikeCount', controller.home.addLikeCount);
    router.post('/addArticle', controller.home.addArticle);
    router.post('/addComment', controller.home.addComment);
  };