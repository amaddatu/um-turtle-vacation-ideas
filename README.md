# um-turtle-vacation-ideas

## Why should I use my own branch?

If working in a group, having separate branches for features/users will help streamline pull requests in an orderly fashion. Make sure to push your code to github frequently and commit your code frequently as well. We need the commit history to undo problematic changes to the project.

## What is package.json used for?

- Used for package dependencies
- Scripts can be used to keep track/run commandline utilities related the project (starting the project)
- Documents the project details

## if i wanted to delete the models Tech and MatchUp, what files do I have to look at?

### Server Side

Model files
typedefs
resolvers
seed.js
servers.js

### React Side

mutations.js
queries.js
component that uses MatchUp/Tech queries
component that uses MatchUp/Tech mutations
look at Routes that use the MatchUp/Tech ids
homepage should work without MatchUp/Tech Home.js
