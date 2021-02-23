# README

### How To Setup Locally

- Build docker containers: `docker-compose build`
- Install gems and dependencies: `docker-compose run --rm app bash -c "bundle install && yarn --check-files"`
- Run migration: `docker-compose run --rm app bash -c "bundle exec rails db:create db:migrate"`

### How To Run

- Run docker containers: `docker-compose up -d`
- Open browser: `http://localhost:3000`

### How To Run Rubocop And Tests

- Run migration: `docker-compose run --rm app bash -c "RAILS_ENV=test bundle exec rails db:create db:migrate"`
- Run Rubocop: `docker-compose run --rm app bash -c "rubocop"`
- Run Backend tests: `docker-compose run --rm app bash -c "rspec"`
- Run Frontend tests: `docker-compose run --rm app bash -c "yarn test"`
