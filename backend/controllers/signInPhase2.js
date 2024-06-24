import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

import fs from "fs";
import path from "path";
import { promisify } from "util";

import { fileURLToPath } from "url";
import { dirname } from "path";
import { User } from "../models/model.js";

const unlinkAsync = promisify(fs.unlink);

//fils join
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const config = {
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION, // Replace with your region
};

const secretKey = process.env.SECRETKEY;

// s3 and lambda clinet
const s3Client = new S3Client(config);
const lambdaClient = new LambdaClient(config);

// Sign In route

// Function to upload file to S3
async function uploadFileToS3(email, file) {
  const fileName = file.originalname;
  const filePath = path.join(__dirname, `../public/uploads/${fileName}`);
  const fileStream = fs.createReadStream(filePath);

  const Bucket = {
    Bucket: "imtestbucket",
    Key: `${email}.jpg`,
  };

  const uploadParams = {
    client: s3Client,
    params: { ...Bucket, Body: fileStream },
    queueSize: 4, // optional concurrency configuration
    partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
    leavePartsOnError: false, // optional manually handle dropped parts
  };

  const parallelUploadS3 = new Upload(uploadParams);

  parallelUploadS3.on("httpUploadProgress", (progress) => {
    console.log(progress);
  });

  await parallelUploadS3.done();

  await unlinkAsync(filePath);

  return Bucket;
}

// Function to invoke Lambda function
async function invokeLambdaFunction(Bucket) {
  const params = {
    FunctionName:
      "lambda-node-visitor-function-VisitorLoginFunction-Zq9Z7MLJuJoe",
    InvocationType: "RequestResponse",
    Payload: JSON.stringify(Bucket),
  };

  try {
    const lambdaInvokeCommand = new InvokeCommand(params);
    const data = await lambdaClient.send(lambdaInvokeCommand);
    const response = JSON.parse(Buffer.from(data.Payload).toString());
    console.log(response);
    return response;
  } catch (error) { }

  // res.status(200).json(response);
}

// Function to delete object from S3
async function deleteObjectFromS3(Bucket) {
  const command = new DeleteObjectCommand(Bucket);
  const response = await s3Client.send(command);
  return response;
}

// Function to generate JWT token
function generateToken(email, userId) {
  const token = jwt.sign({ email, id: userId }, secretKey, {
    expiresIn: "1m", // 30 days
  });
  return token;
}

export const signInPhase2 = async (req, res) => {
  try {
    const { email } = req.body;
    const file = req.file;
    console.log("req.file", req.file);
    console.log("email", email);

    const Bucket = await uploadFileToS3(email, file);
    const lambdaResponse = await invokeLambdaFunction(Bucket);
    const deleteResponse = await deleteObjectFromS3(Bucket);

    console.log(lambdaResponse);
    if (deleteResponse.DeleteMarker === false) throw "Failed to delete object from bucket"
    if (lambdaResponse.statusCode !== 200 || lambdaResponse.statusCode ==undefined) throw lambdaResponse.body.message;

    const user = await User.findOne({ email });
    console.log(user)
    const token = generateToken(email, user._id);

    res.status(201).json({
      status: true,
      content: {
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        meta: {
          access_token: token,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error,
    });
  }
};

/*
export const signInPhase2 = async (req, res) => {
  const { email } = req.body;
  const file = req.file;
  console.log("req.file", req.file);

  const fileName = file.originalname;
  const filePath = path.join(__dirname, `../public/uploads/${fileName}`);

  const fileStream = fs.createReadStream(filePath);

  const Bucket = {
    Bucket: "imtestbucket",
    Key: `${email}.jpg`,
  };
  const input1 = {
    ...Bucket,
    Body: fileStream,
  };

  try {
    const parallelUploads3 = new Upload({
      client: s3Client,
      params: input1,
      queueSize: 4, // optional concurrency configuration
      partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
      leavePartsOnError: false, // optional manually handle dropped parts
    });

    parallelUploads3.on("httpUploadProgress", (progress) => {
      console.log(progress);
    });

    await parallelUploads3.done();

    const params = {
      FunctionName:
        "lambda-node-visitor-function-VisitorLoginFunction-Zq9Z7MLJuJoe",
      InvocationType: "RequestResponse", // Synchronous invocation
      Payload: JSON.stringify({
        ...Bucket,
      }), // Any payload data you want to send
    };

    const LambdaInvokeCommand = new InvokeCommand(params);

    try {
      const data = await lambdaClient.send(LambdaInvokeCommand);
      const response = JSON.parse(Buffer.from(data.Payload).toString());
      console.log(response);
      // res.status(200).json(response);

      const user = await User.findOne({ email });

      try {
        // jwt token using email and id
        const token = jwt.sign({ email: email, id: user._id }, secretKey);

        res.status(201).json({
          status: true,
          content: {
            data: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
            meta: {
              access_token: token,
            },
          },
        });
      } catch (error) {
        console.log(error);
        res
          .status(500)
          .json({ message: "Internal server error", error: error });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "lambda invoke error", error: error });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "object put error", error: error });
  }
};

*/
