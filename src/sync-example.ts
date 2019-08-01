import { pipe } from 'fp-ts/lib/pipeable'
import { IOEither, tryCatch,right,left} from 'fp-ts/lib/IOEither'
import { IO } from 'fp-ts/lib/IO'

const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');
import { fold } from 'fp-ts/lib/Either'

export interface AppConfig {
    service: {
        interface: string
        port: number
    };
}

function readFileSync(path: string): IOEither<Error, string> {
    return tryCatch(() => fs.readFileSync(path, 'utf8'), reason => new Error(String(reason)))
}

function readYaml(content: string): IOEither<Error, AppConfig> {
    return tryCatch(() => yaml.safeLoad(content), reason => new Error(String(reason)))
}
 
function loadConfig(filePath: string):IOEither<Error,AppConfig>{
    return pipe(
        readFileSync(path.resolve(filePath))(),
        fold(e=>left(e),
             f=>pipe(
                readYaml(f)(),
                fold(e=>
                    left(e),
                    c=>right(c)
                )
            )
        )
    )
} 

const log = (s: unknown): IO<void> => () => console.log(s)

log("\nInvalid filename")()
pipe(
    loadConfig('config.yaml')(),
    fold(e=>log("Failed to load config: "+e)(), c=>log(c)())
)

log("\nInvalid YAML file")()
pipe(
    loadConfig('invalid-config.yaml')(),
    fold(e=>log("Failed to load config: "+e)(), c=>log(c)())
)

log("\nValid config file")()
pipe(
    loadConfig('app-config.yaml')(),
    fold(e=>log("Failed to load config: "+e)(), c=>log(c)())
)
