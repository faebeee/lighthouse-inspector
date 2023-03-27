# DB
prisma-generate-migration:
	npx prisma migrate dev

prisma-generate-client:
	npm run prisma:generate

# DOCKER
docker-build:
	make docker-build-web
	make docker-build-cron

docker-push:
	make docker-push-web
	make docker-push-cron

docker-build-web:
	docker build --no-cache -f docker/web/Dockerfile -t faebeee/web-audit-web:latest .

docker-run-web:
	docker run --env-file .env -p 3000:3000 --name web-audit-web faebeee/web-audit-web

docker-push-web:
	docker push faebeee/web-audit-web:latest

docker-run-cron:
	docker run --env-file .env --name web-audit-cron faebeee/web-audit-cron

docker-build-cron:
	docker build --no-cache -f docker/cron/Dockerfile -t faebeee/web-audit-cron:latest .

docker-push-cron:
	docker push faebeee/web-audit-cron:latest
