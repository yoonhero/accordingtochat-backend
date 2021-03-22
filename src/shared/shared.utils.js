import AWS from "aws-sdk";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

export const uploadToS3 = async (file, userId, folderName) => {
  console.log(file);
  const { filename, createReadStream } = await file;
  const readStream = createReadStream();
  const objectName = `${folderName}/${userId}-${filename}`;

  const { Location } = await new AWS.S3()
    .upload({
      Bucket: "accordingtocoding-chatapp",
      Key: objectName,
      ACL: "public-read",
      Body: readStream,
    })
    .promise();

  return Location;
};
