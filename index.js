/* eslint-disable prefer-destructuring */
/* eslint-disable no-useless-escape */
/* eslint-disable camelcase */
const got = require('got');

function randomPost(sub) {
  return got(`https://www.reddit.com/r/${sub}/random/.json`, { json: true, headers: {
    'user-agent': 'Chrome'
  }}).then((resp) => {
    const {
      children,
    } = !Array.isArray(resp.body)
      ? resp.body.data
      : resp.body[0].data;

    // Check if it contains something
    if (children.length < 1) {
      throw new Error('No posts.');
    }

    let {
      data,
    } = children[0];

    // Check if crossposted
    if (data.crosspost_parent_list) {
      data = data.crosspost_parent_list[0];
    }

    // Parse post
    const {
      title,
      selftext,
      ups,
      downs,
      num_comments,
      url,
      permalink,
      author,
      over_18,
      is_self,
    } = data;

    const obj = {
      title,
      content: selftext,
      author,
      upvotes: ups,
      downvotes: downs,
      comments: num_comments,
      nsfw: over_18,
      reddit_url: `https://reddit.com${permalink}`,
    };

    // Check if this post contains an image/video/gif
    // TODO: Check more cases
    if (!is_self) {
      // Get proper media url
      if (url.startsWith('https://v.redd.')) {
        obj.media_url = data.media.reddit_video.fallback_url;
      } else if (url.startsWith('https://gfycat.')) {
        const reg = /[^\/]+(?=\/$|$)/;
        const match = reg.exec(url);

        if (match) {
          obj.media_url = `https://giant.gfycat.com/${match[0]}.webm`;
        }
      } else {
        obj.media_url = url;
      }
    }

    return obj;
  });
}

module.exports = sub => randomPost(sub);
