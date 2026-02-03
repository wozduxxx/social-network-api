const express = require("express");
const router = express.Router();

const {
    UserController,
    PostController,
    CommentsController,
    LikeController,
    FollowController
} = require("../controllers");
const { authenticateToken } = require("../middleware/auth");
const multer = require('multer');

const uploadDestination = 'uploads';

// Показываем, где хранить загружаемые файлы
const storage = multer.diskStorage({
  destination: uploadDestination,
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });
// Роуты User
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/current", authenticateToken, UserController.current);
router.get("/users/:id", authenticateToken, UserController.getUserById);
router.put("/users/:id", authenticateToken, upload.single('avatar'), UserController.updateUser);

// // Роуты Post
router.post('/posts', authenticateToken, PostController.createPost)
router.get('/posts', authenticateToken, PostController.getAllPosts)
router.get('/posts/:id', authenticateToken, PostController.getPostById)
router.delete('/posts/:id', authenticateToken, PostController.deletePost)

// // Роуты подписки
router.post("/follow", authenticateToken, FollowController.followUser);
router.delete("/unfollow/:id",authenticateToken, FollowController.unfollowUser);

// // Роуты лайков
router.post("/likes", authenticateToken, LikeController.likePost);
router.delete("/likes/:id", authenticateToken, LikeController.unlikePost);

// // Роуты комментариев
router.post("/comments", authenticateToken, CommentsController.createComment);
router.delete(
  "/comments/:id",
  authenticateToken,
  CommentsController.deleteComment
);

module.exports = router;
