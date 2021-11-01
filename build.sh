cd api
npm ci
npm run build

cd ../auth-service
npm ci
npm run build

cd ../task-service
npm ci
npm run build
