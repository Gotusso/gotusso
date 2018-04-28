#!/bin/sh

SRC=$(git ls-files | grep -v "dist/" | xargs echo)
if ! [[ -z "$(git diff-index HEAD -- ${SRC})" ]]; then
  echo "Working directory not clean, exiting"
  exit 1
fi

yarn clean
yarn build
git add dist
git commit -m "Publish site"
git subtree push --prefix dist origin master
