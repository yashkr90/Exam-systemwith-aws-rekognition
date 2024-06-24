// import AWS from "aws-sdk";
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import {
  RekognitionClient,
  DetectFacesCommand,
  CompareFacesCommand,
} from "@aws-sdk/client-rekognition";
import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// const s3 = new AWS.S3();
// const rekognition = new AWS.Rekognition();
// const dynamodb = new AWS.DynamoDB();
// const lambda = new AWS.Lambda();

const config = {
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION, // Replace with your region
};

const filePath = path.join(__dirname, "alka.jpg");
const s3Client = new S3Client(config);
const fileStream = fs.createReadStream(filePath);

const input1 = {
  Bucket: "imtestbucket",
  Key: "alka.jpg",
  Body: fileStream,
};

const input2 = {
  Bucket: "face-detect-bucket-new",
  Key: "singleface.jpg",
  Body: fileStream,
};
const S3command1 = new PutObjectCommand(input1);
// const S3command2 = new PutObjectCommand(input2);

try {
  const response1 = await s3Client.send(S3command1);
  //   const response2 = await s3Client.send(S3command2);

  // console.log(response1);
  // console.log(response2);
} catch (error) {
  console.log(error);
}

// rekognition clinet
const rekognitionClient = new RekognitionClient(config);

//

//lambda clint for uploading

const lambdaClient = new LambdaClient(config);

const params = {
    FunctionName: 'lambda-node-visitor-function-VisitorLoginFunction-Zq9Z7MLJuJoe',
    InvocationType: 'RequestResponse', // Synchronous invocation
    Payload: JSON.stringify({
        Bucket: "imtestbucket",
        Key: "alka.jpg",
    }) // Any payload data you want to send
};

const Lambdacommand = new InvokeCommand(params);

try {
    const data = await lambdaClient.send(Lambdacommand);
    const response =JSON.parse(Buffer.from(data.Payload).toString());
    console.log(response);
} catch (error) {
    console.log(error);
}

//-------------------------------

const event = {
  Bucket: "imtestbucket",
  Key: "ss1.jpg",
};

// const lambdahandler = async (event) => {
//   console.log(event);
//   const Bucket = event.Bucket;
//   const Key = event.Key;
//   // const resBody = {};
//   // resBody.name = key;

//   try {
//     // const getObjectCommand = new GetObjectCommand({
//     //   Bucket: Bucket,
//     //   Key: Key,
//     // });
//     //const SourceImage = await s3Client.send(getObjectCommand);
//     // console.log("source",SourceImage);
//     // const SourceImageBytes= response.Body;

//     // console.log("sources: " + SourceImageBytes);

//     const detectFacesCommand = new DetectFacesCommand({
//       Image: {
//         S3Object: {
//           Bucket: Bucket,
//           Name: Key,
//         },
//       },
//     });
//     try {
//       const response = await rekognitionClient.send(detectFacesCommand);
//       const numFaces = response.FaceDetails.length;

//       if (numFaces === 1) {
//         // const getObjectCommandTargetImage = new GetObjectCommand({
//         //   Bucket: "face-detect-bucket-new",
//         //   Key: Key,
//         // });
//         //const TargetImage = await s3Client.send(getObjectCommandTargetImage);
//         // console.log("target image response " ,response);
//         // console.log("target image: " , TargetImage.Body);

//         //compare the faces

//         // const srcbyte=await SourceImage.Body.blob();
//         // const targetbyte= await TargetImage.Body.blob();
//         const compareFacesCommand = new CompareFacesCommand({
//           // CompareFacesRequest
//           SourceImage: {
//             //   Bytes: srcbyte,
//             S3Object: {
//               // S3Object
//               Bucket: Bucket,
//               Name: Key,
//             },
//           },
//           TargetImage: {
//             //   Bytes: targetbyte,
//             S3Object: {
//               // S3Object
//               Bucket: "face-detect-bucket-new",
//               Name: Key,
//             },
//           },
//           SimilarityThreshold: 99,
//         });

//         try {
//           const response = await rekognitionClient.send(compareFacesCommand);
//           console.log(response);
//           if (response.FaceMatches.length > 0) {
//             // If there are matches, return success with FaceMatches
//             return {
//               statusCode: 200,
//               body: JSON.stringify({message:"face found"}),
//             };
//           } else {
//             // If there are no matches, return a "not found" status
//             return {
//               statusCode: 404,
//               body: JSON.stringify({ message: "No face matches found." }),
//             };
//           }
//         } catch (error) {
//             return {
//                 statusCode: 500,
//                 body: JSON.stringify({ error: error.message })
//               };
//         }
//       } else {
//         console.log("multiple faces detected");
//         return {
//             statusCode: 401,
//             body: JSON.stringify({ message:"multiple faces detected"})
//           };
//       }
//     } catch (error) {
//       console.log(error);
//       return {
//         statusCode: 500,
//         body: JSON.stringify({ error: error.message })
//       };
//     }
//   } catch (error) {
//     console.log(error);
//     return {
//         statusCode: 500,
//         body: JSON.stringify({ error: error.message })
//       };
//   }


// };

// lambdahandler(event);
