```bash
yarn install
```

Then run the server (runs on port 4000)

```bash
yarn start:dev
```

and the stellate server

```bash
yarn stellate serve --backend-port 4000 --service damien --path /graphql --watch
```

And then sending the following request:

```graphql
query Categories($onlyRoots: Boolean) {
  categories(onlyRoots: $onlyRoots) {
    id
  }
}
```