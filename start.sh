#!/bin/sh

cd scraping
npm i 
cd ../

npm run deckBuild -- $1

npm run start