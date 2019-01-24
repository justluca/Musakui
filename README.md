# Musakui [![build status][build badge]][build url]

> An easy to use module to fetch random posts from any subreddit

## Usage

```js
const musakui = require('musakui');

musakui('aww')
  .then(result => console.log(result))
  .catch(error => console.log(error));
```

## Example result

```json
{
  "title": "Example reddit post",
  "content": "",
  "author": "luca",
  "upvotes": 3,
  "downvotes": 2,
  "comments": 1,
  "nsfw": false,
  "reddit_url": "https://reddit.com/r/.../.../",
  "media_url": "https://i.redd.it/.../"
}
```

Please note that `media_url` won't be present if the post doesn't contain any kind of media.

[build badge]: https://travis-ci.com/justluca/Musakui.svg?branch=master
[build url]:   https://travis-ci.com/justluca/Musakui
