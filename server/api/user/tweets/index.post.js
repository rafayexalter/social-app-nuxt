import formidable from "formidable";
import { createMediaFile } from "~~/server/db/mediaFiles";
import { createTweet } from "~~/server/db/tweets";
import { tweetTransformer } from "~~/server/transformers/tweet";
import { uploadToCloudinary } from "../../../utils/cloudinary";

export default defineEventHandler(async (event) => {
  const form = formidable({});

  const response = await new Promise((resolve, reject) => {
    form.parse(event.node.req, (err, fields, files) => {
      if (err) {
        reject(err);
      }
      resolve({ fields, files });
    });
  });

  const { fields, files } = response;

  // it gets the id because we have allowed it in middle for authorization
  const userId = event.context?.auth?.user?.id;

  const tweetData = {
    text: fields.text,
    authorId: userId,
  };

  const replyTo = fields.replyTo;

  if (replyTo && replyTo !== "null") {
    tweetData.replyToId = parseInt(replyTo);
  }

  const tweet = await createTweet(tweetData);

  const filePromises = Object.keys(files).map(async (key) => {
    const file = files[key];

    // Upload media to cloudinary and get data back
    const cloudinaryResponse = await uploadToCloudinary(file.filepath);

    console.log(cloudinaryResponse);

    // save the cloudinaryResponse in db, such as image url
    return createMediaFile({
      url: cloudinaryResponse.secure_url,
      providerPublicId: cloudinaryResponse.public_id,
      userId: userId,
      tweetId: tweet.id,
    });
  });

  await Promise.all(filePromises);

  return {
    tweet: tweetTransformer(tweet),
  };
});
