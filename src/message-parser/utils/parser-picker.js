import {save, get} from "../../common/context/app-context";
//
import MokoH4DH1 from "../devices/moko-h4dh1";
import MokoH4DH2 from "../devices/moko-h4dh2";
import ParserType from "../enum/parser-types";
import MokoMk103 from "../gateways/moko-mk103";

const registerDeviceParser = (key) => {
    switch (key) {
        case 'MOKO-H4DH1':
            return save(key, new MokoH4DH1());
        case 'MOKO-H4DH2':
            return save(key, new MokoH4DH2());
        default:
            console.log(`un supported parser type ${key}`);
    }
}

const registerParser = (key) =>{
    switch (key) {
        case ParserType.MQTT:
            return new MokoMk103(get('PARSER_CONFIG'));
        default:
            throw Error('parser type invalid');
    }
}

export const pickDeviceParser = (make, model) => {
    const key = make.toUpperCase() + '-' + model.toUpperCase();
    let parser = get(key);
    if (parser) {
        return parser;
    }
    parser = registerDeviceParser(key);
    return parser;
}


export const pickParser = (type) => {
    let parser = get(type);
    if (parser) {
        return parser;
    }
    parser = registerParser(type);
    return parser;
}
