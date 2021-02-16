const { Sequelize, DataTypes } = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/bookmarks');

const Bookmark = db.define('bookmark', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Category = db.define('category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Bookmark.belongsTo(Category);
Category.hasMany(Bookmark);

const init = async () => {
  try {
    await db.authenticate();
    console.log('authenticated...');
    await db.sync({ force: true });
    //define categories
    const Entertainment = new Category({
      name: 'Entertainment',
    });
    const Search = new Category({
      name: 'Search',
    });
    const Shopping = new Category({
      name: 'Shopping',
    });
    const Coding = new Category({
      name: 'Coding',
    });
    const SocialMedia = new Category({
      name: 'Social Media',
    });
    const Music = new Category({
      name: 'Music',
    });

    await Promise.all([
      Entertainment.save(),
      Search.save(),
      Shopping.save(),
      Coding.save(),
      SocialMedia.save(),
      Music.save(),
    ]);
    //define bookmarks
    const Netflix = new Bookmark({
      name: 'Netflix',
      url: 'http://www.netflix.com',
      categoryId: 1,
    });
    const Google = new Bookmark({
      name: 'Google',
      url: 'http://www.google.ca',
      categoryId: 2,
    });
    const Amazon = new Bookmark({
      name: 'Amazon',
      url: 'http://www.amazon.ca',
      categoryId: 3,
    });
    const Nodejs = new Bookmark({
      name: 'Node.js',
      url: 'http://www.nodejs.org',
      categoryId: 4,
    });
    const Instagram = new Bookmark({
      name: 'Instagram',
      url: 'http://www.instagram.com',
      categoryId: 5,
    });
    const Spotify = new Bookmark({
      name: 'Spotify',
      url: 'http://www.spotify.com',
      categoryId: 6,
    });

    await Promise.all([
      Netflix.save(),
      Google.save(),
      Amazon.save(),
      Nodejs.save(),
      Instagram.save(),
      Spotify.save(),
    ]);
    //await db.close();
  } catch (err) {
    console.log(err);
  }
};
init();

module.exports = {
  db,
  models: {
    Bookmark,
    Category,
  },
};
