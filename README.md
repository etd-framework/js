# ETD Framework JS Package

## Babel installation

```bash
npm install --save-dev babel-cli babel-preset-es2015 babel-plugin-transform-class-properties babel-plugin-transform-es2015-modules-amd babel-preset-babili babel-plugin-minify-empty-function
```

## File watchers

See watchers.xml

```
* Filetype                : ECMAScript 6
* Program                 : $ProjectFileDir$/node_modules/.bin/babel
* Arguments               : --no-comments --out-file $ProjectFileDir$/dist/$FileNameWithoutExtension$.js $FilePath$
* Output paths to refresh : $ProjectFileDir$/dist/$FileNameWithoutExtension$.js
```
