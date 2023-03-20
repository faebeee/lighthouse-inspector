start:
	npm run start

cron:
	npm run cron

generate-migration:
	npx prisma migrate dev

generate-client:
	npm run prisma:generate

docker-build-web:
	docker build --no-cache -t faebeee/web-audit-web:latest  .

docker-run-web:
	docker rm web-audit-web
	docker run --env-file .env -p 3000:3000 --name web-audit-web faebeee/web-audit-web

docker-push-web:
	docker push faebeee/web-audit-web:latest

docker-run-cron:
	docker rm web-audit-cron
	docker run --env-file .env --name web-audit-cron faebeee/web-audit-cron

docker-publish-cron:
	docker build --no-cache -t faebeee/web-audit-cron:latest  ./cron.Dockerfile
	docker push faebeee/web-audit-cron:latest
