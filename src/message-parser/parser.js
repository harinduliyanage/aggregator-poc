import * as parserContext from "./context/parser-context";
import {pickParser} from "./utils/parser-picker";

export default class Parser {

    constructor(parserType, config) {
        parserContext.save('PARSER_CONFIG', config);
        this.parser = pickParser(parserType);
    }

    parse (rawMessage) {
        return this.parser.parse(rawMessage);
    }

}
