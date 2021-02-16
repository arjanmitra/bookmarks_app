const html = require('html-template-tag');
function detailsPage(title, bookmarks = []) {
  return html`
    <html>
      <head>
        <title>Bookmarks</title>
        <link rel="stylesheet" href="/public/styles.css" />
      </head>
      <body>
        <h1>My ${title} Bookmarks!</h1>

        <div>
          ${bookmarks.map(
            (bookmark) =>
              `<div><form method='POST' action='/${title}/${
                bookmark.id
              }?_method=DELETE'>
              <a name='${bookmark.id}' href='${bookmark.url}'>${
                bookmark.name
              }</a>
              <button name='submit' value = '${[
                bookmark.id,
                title,
              ]}'>x</button></form></div>`
          )}
          <br /><br /><br />
          <a href="/"><button>Back</button></a>
        </div>
      </body>
    </html>
  `;
}

module.exports = detailsPage;

//<input type='Delete' id='delete${bookmark.name}'></form></div>`
