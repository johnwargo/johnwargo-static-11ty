#!/usr/bin/env bash

# Work in progress, doesn't work

# read the environment variable
DEBUG=$DEBUG
# if the variable is not set to "eleventy*" then set it to "eleventy*"
if [[ $DEBUG != Eleventy* ]]; then
  DEBUG=Eleventy*
  # else if the variable is set to "eleventy*" then set it to null
else
  DEBUG=
fi 
