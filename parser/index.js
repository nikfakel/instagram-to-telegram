const util = require('util')
var Storage = require('node-storage');
let { igApi, getCookie } = require("insta-fetcher");

const log = (object) => {
  console.log(util.inspect(object, {showHidden: false, depth: null, colors: true}));
}

const removeExtraData = (post) => {

}

const updatePosts = (oldPosts, newPosts) => {
  if (!oldPosts) return newPosts.reverse();
  const posts = [...oldPosts];

  newPosts.forEach(newPost => {
    if (oldPosts.findIndex(oldPost => oldPost.id === newPost.id) === -1) {
      posts.push(newPost)
    }
  })

  return posts
}

const sessionStore = new Storage('storage/session.json');
const postsStore = new Storage('storage/posts.json');
const errorsStore = new Storage('storage/errors.json');

(async () => {
  console.log('======================= start =======================')
  try {
    const sessionId = sessionStore.get('sessionId.id');
    let ig = new igApi(sessionId, false);

    if (ig.accountUserId) {
      const date = sessionStore.get('sessionId.date');
      console.log(date);
      log(`logged in, session id date: ${new Date(sessionStore.get('sessionId.date')).toLocaleString()}`)

      ig.fetchUserPostsV2('rihannaofficiall').then(res => {
        const oldPosts = postsStore.get('posts.rihanna');
        const newPosts = updatePosts(oldPosts, res.edges);
        postsStore.put('posts.rihanna', newPosts);
      })
    } else {
      const newSessionId = await getCookie("", "");
      sessionStore.put('sessionId.id', newSessionId)
      sessionStore.put('sessionId.date', Date.now())
    }
  } catch (error) {
    console.log(error);
    errorsStore.put(`error.${Date.now()}.message`, error.message);
    errorsStore.put(`error.${Date.now()}.stack`, error.stack);
  }
})();
