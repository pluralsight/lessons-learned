# TypeScript starter kit

A bare-bones starter kit for typescript. My [new-project-script](https://github.com/Rolias/new-project-script) repository is a convenient way to clone a repo, get rid of all the old history and have a shiny new repo to work in.

## Chrome Extensions

When writing a chrome extension, or I suppose for the front end in general, the `tsconfig.json` will need adjustments:

```json
    "module": "es6",
    "moduleResolution": "classic",
```

For node development in mid-2019, the defaults are fine.
