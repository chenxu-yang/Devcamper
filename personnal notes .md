dotenv保存环境变量

```javascript
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });
const PORT = process.env.PORT || 5000; 
```

.gitignore: 不上传某些文件



routes文件夹:保存各个方法对应的地址

```javascript
server.js:
const bootcamps = require('./routes/bootcamps');
app.use('/api/v1/bootcamps', bootcamps);

routes/bootcamps.js:
const router = express.Router();
const {
  getBootcamp,
  getBootcamps,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
} = require('../controllers/bootcamps');
router.route('/').get(getBootcamps).post(createBootcamp);
router
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);
module.exports = router;
```

Controllers文件夹：定义各种方法

```
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'show all bootcamps' });
};
```




