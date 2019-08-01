# fp-ts_sync-example
FP-TS Sync-Example (read file/parse yaml synchronously)

Learning FP-TS and trying to work with some real world examples.

This project was just to see that I can go this synchronously. I am actually trying to work with an asychronous versions of this project (https://github.com/anotherhale/fp-ts_async-example) and would like any feedback or help with that project.

`npm run build`

`npm run start `

Resulting application output:
```
Invalid filename
Failed to load config: Error: Error: ENOENT: no such file or directory, open '/home/ahale/dev/fp-ts_sync-example/config.yaml'

Invalid YAML file
Failed to load config: Error: YAMLException: end of the stream or a document separator is expected at line 2, column 12:
      interface: "127.0.0.1"
               ^

Valid config file
{ service: { interface: '127.0.0.1', port: 9090 } }
```