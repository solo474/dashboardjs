aws s3 cp build s3://vzsandbox-public --recursive
aws s3 cp build s3://serverlessrepo-cloudfront-authorization-s3bucket-1a9hotn68scuq --recursive
aws cloudfront create-invalidation --distribution-id E397YWFP80I254 --paths "/*"
