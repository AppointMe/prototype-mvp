# BUILD stage
FROM golang:1.24 as builder
WORKDIR /app
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

# RUN stage
FROM scratch
WORKDIR /app
COPY --from=builder /app/main .
EXPOSE 8090
CMD ["./main", "serve", "--http", "0.0.0.0:8090"]
