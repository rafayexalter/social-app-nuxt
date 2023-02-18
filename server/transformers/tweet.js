import { mediaFileTransformer } from "./mediaFiles";
import { userTransformer } from "./user";

export const tweetTransformer = (tweet) => {
  /**
   * Get tweet data and exclude extra data such as createdAt, updatedAt etc
   */
  return {
    id: tweet.id,
    text: tweet.text,
    mediaFiles: !!tweet.mediaFiles
      ? tweet.mediaFiles.map(mediaFileTransformer)
      : [],
    author: tweet.author ? userTransformer(tweet.author) : [],
    replies: !!tweet.replies ? tweet.replies.map(tweetTransformer) : [],
    replyTo: !!tweet.replyTo ? tweetTransformer(tweet.replyTo) : null,
  };
};
