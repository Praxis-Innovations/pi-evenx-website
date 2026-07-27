# Website deployment decision

Every pull request, plus pushes to the repository's `develop` default branch
or production `prod` branch, runs one ephemeral GitHub Actions job named
`build`. This check is not a deployed preview or backend environment and uses
a local placeholder API origin only to compile the site.

The repository has exactly three explicit build modes:

- `yarn build:local` targets the loopback backend at `http://localhost:8080`;
- `yarn build:placeholder` uses `NEXT_PUBLIC_API_URL` when supplied and
  otherwise compiles against the reserved, non-routable
  `https://api.invalid` placeholder; and
- `yarn build:prod` targets the documented production API at
  `https://api.evenx.io`.

There are no checked-in development or preview backend environments.

The existing external Vercel integration currently auto-deploys the website to
production. This repository change does not modify that behavior or any Vercel
project, environment variable, domain, or token.

Whether website production should remain automatic is a separate manual
decision for Amar. If the desired policy is manual website production, Amar
must change the Vercel project configuration explicitly; the backend's manual
Fly deploy policy does not alter Vercel.
