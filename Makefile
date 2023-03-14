start:
	npm run start

cron:
	npm run cron

generate-migration:
	npx prisma migrate dev

generate-client:
	npm run prisma:generate
