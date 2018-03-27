# hello-web

## Docker
```bash
# Build image
docker build -t hello-web .

# List images
docker images

# Run images
docker run -d -p 3080:80 hello-web


# Tag image with VERSION
docker tag hello-web nkuba/hello-web:${VERSION}

# Push image to Docker Hub
docker push nkuba/hello-web
```