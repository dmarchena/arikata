# Arikata

https://arikata.dev

Browser-based JS Katas


## Open source project for educational purpose

This demo site has been developed as final work for Bachelor's Degree in Computer Engineering.

## Why Arikata?

_Ariketa_ is a Basque word which means _exercise_. It was clear that was the perfect name to refer to katas or programming exercises.

## Features

* REACTIVE: Developed using Vue in order to build a fast and high performance front end. It uses Vuex as a cache and app state storage. CSS Architecture is based on BEM and 7-1 pattern.
* HEXAGONAL ARCHITECTURE: Designed following DDD and structured in infrastructure, application and domain layers. Front end and back end share the same application and domain code. Back end runs on a Docker environment with nodejs and Postgres and exposes a Rest API to communicate with front end.
* CODE SANDBOX: Text editor is based on CodeMirror and code runs on a sandboxed iframe with a custom window object to isolate it. Minimal test runner has been coded and chai is used as assertion library.
