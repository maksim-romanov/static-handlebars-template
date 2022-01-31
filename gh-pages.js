const ghpages = require('gh-pages');

ghpages.publish('dist', (error) => {
  if (!error) return console.log('Deploy has been successed 🚀');

  console.error('Error 👿', JSON.stringify(error));
});