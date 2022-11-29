### Harvest-Talent-Builder

## Getting Started

1. Create a new personal (and private!) repository in the Harvest-Builder github organization: https://github.com/Harvest-Builders/
   name: Samurai-Pizza-Cats-<SeanLee>

1. Cloning the repository
   `git clone https://github.com/Harvest-Builders/Samurai-Pizza-Cats.git`

1. Rename your origin upstream so that your changes get pushed to your own repository
   `cd Samurai-Pizza-Cats`
   `git remote rename origin upstream`
   `git remote add origin git@github.com:Harvest-Builders/Samurai-Pizza-Cats-<SeanLee>.git`

1. Check to make sure your origin is the newly created repo
   `git config --get remote.origin.url`

1. Push your local copy to the version with matching name on the Harvest Builders Github
   `git push -u origin master`

1. Check Github and make sure your repo is there with all of its code

## running the code:

1. Run `npm run install:all` to install dependencies
2. Run `docker-compose up` to start a local mongo database instance in a docker container
3. Run `npm run seed:database` to seed your local database
4. Run `npm start` in the root folder to start the client and server in parallel.

Note: Alternatively, you can run `npm start` for the client and server in separate terminals.

## Server Notes

- Every time you update the graphql schema, you will need to `npm run generate:types`

## Client Notes

- Watch the terminal for React warnings, and ensure they are fixed before putting up your pull request.

### Troubleshooting

If you are on linux you may get the following error: `Error: ENOSPC: System limit for number of file watchers reached`

#### Solution:

Modify the number of system monitoring files

1. Edit your `sysctl.conf` with `sudo gedit /etc/sysctl.conf`
2. Add the following line at to the bottom `fs.inotify.max_user_watches=524288` then save and exit
3. Verify this changed worked with `sudo sysctl -p`
