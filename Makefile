build:
	docker build -f Dockerfile -t proyecto/node:latest .

run:
	docker run -p 3001:3001 proyecto/node:latest