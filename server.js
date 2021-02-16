const db = require('./db');
const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const landingPage = require('./views/bookmarksLandingPage');
const detailsPage = require('./views/bookmarksDetailsPage');
//const { all } = require('sequelize/types/lib/operators');
const port = process.env.port || 3000;

app.use(require('method-override')('_method'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, '/public')));

app.listen(port, () => {
  console.log('listening on port: ${port}');
});

app.get('/', async (req, res, next) => {
  try {
    const allCategories = await db.models.Category.findAll();
    res.send(landingPage(allCategories));
  } catch (err) {
    next(err);
  }
});

app.get('/:name', async (req, res, next) => {
  try {
    const name = req.params.name;
    const allBookmarksQuery = await db.models.Category.findAll({
      include: [{ model: db.models.Bookmark }],
      where: {
        name: name,
      },
    });
    const allBookmarks = allBookmarksQuery[0].dataValues.bookmarks;
    res.send(detailsPage(name, allBookmarks));
  } catch (err) {
    next(err);
  }
});

app.post('/', async (req, res, next) => {
  try {
    const sitename = req.body.sitename;
    const siteurl = req.body.siteurl;
    const sitecategory = req.body.sitecategory;

    const [insCat, wasCreatedCat] = await db.models.Category.findOrCreate({
      where: {
        name: sitecategory,
      },
    });
    const [insBook, wasCreatedBook] = await db.models.Bookmark.findOrCreate({
      where: {
        name: sitename,
        url: siteurl,
        categoryId: insCat.id,
      },
    });

    res.redirect('/');
  } catch (err) {
    next(err);
  }
});

app.post('/:name', async (req, res, next) => {
  try {
    const reqbody = req.body;
    console.log(req.headers);
    // await db.models.Bookmark.destroy({
    //   where: {
    //     name: name,
    //   },
    // });
    res.redirect('/');
  } catch (err) {
    next(err);
  }
});
