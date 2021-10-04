build:
	REACT_APP_API_URL=https://api.til.selleo.com npm run build

deploy: 
	aws s3 sync build/ s3://selleo-til-app/til

invalidate:
	aws cloudfront create-invalidation --distribution-id ${ID} --paths "/*"
