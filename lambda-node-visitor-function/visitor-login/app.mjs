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
/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

export const lambdaHandler = async (event, context) => {
  const rekognitionClient = new RekognitionClient({});
  const s3Client = new S3Client({});

  console.log(event);
  const Bucket = event.Bucket;
  const Key = event.Key;
  // const resBody = {};
  // resBody.name = key;

  try {
    const detectFacesCommand = new DetectFacesCommand({
      Image: {
        S3Object: {
          Bucket: Bucket,
          Name: Key,
        },
      },
    });
    try {
      const response = await rekognitionClient.send(detectFacesCommand);
      const numFaces = response.FaceDetails.length;

      if (numFaces === 1) {
        const getObjectCommandTargetImage = new GetObjectCommand({
          Bucket: "face-detect-bucket-new",
          Key: Key,
        });
        try {
          const TargetImage = await s3Client.send(getObjectCommandTargetImage);
        } catch (error) {
          return {
            statusCode: 400,
            body: { message: "face not registered", error: error },
          };
        }

        const compareFacesCommand = new CompareFacesCommand({
          // CompareFacesRequest
          SourceImage: {
            //   Bytes: srcbyte,
            S3Object: {
              // S3Object
              Bucket: Bucket,
              Name: Key,
            },
          },
          TargetImage: {
            //   Bytes: targetbyte,
            S3Object: {
              // S3Object
              Bucket: "face-detect-bucket-new",
              Name: Key,
            },
          },
          SimilarityThreshold: 99,
        });

        try {
          const response = await rekognitionClient.send(compareFacesCommand);
          console.log(response);
          if (response.FaceMatches.length > 0) {
            // If there are matches, return success with FaceMatches
            return {
              statusCode: 200,
              body: { message: "face found" },
            };
          } else {
            // If there are no matches, return a "not found" status
            return {
              statusCode: 404,
              body: { message: "No face matches found." },
            };
          }
        } catch (error) {
          return {
            statusCode: 500,
            body: { error: error.message },
          };
        }
      } else if (numFaces === 0) {
        console.log("no faces detected");
        return {
          statusCode: 401,
          body: { message: "no faces detected" },
        };
      } else {
        console.log("multiple faces detected");
        return {
          statusCode: 401,
          body: { message: "multiple faces detected" },
        };
      }
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        body: { error: error.message },
      };
    }
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: { error: error.message },
    };
  }
};
