const html = require('html-template-tag');
function landingPage(categories = [], submitReturnValue = '') {
  return html`
    <html>
      <head>
        <title>Bookmarks</title>
        <link rel="stylesheet" href="/public/styles.css" />
      </head>
      <body>
        <h1>My Bookmarks</h1>
        <form method="post" action="/">
          Site Name: <input name="sitename" /> <br /><br />
          Site URL: <input name="siteurl" /> <br /><br />
          Site Category: <input name="sitecategory" /><br /><br />
          <button id="submitbutton" type="submit">Submit</button>
          <br /><br />
        </form>
        <div id="buttons">
          ${categories.map(
            (category) =>
              `<div><a href='/${category.name}'><button>${category.name}</button></a></div>`
          )}
        </div>
      </body>
    </html>
  `;
}

module.exports = landingPage;
