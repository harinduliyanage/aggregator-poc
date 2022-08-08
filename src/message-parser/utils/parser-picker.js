import {save, get} from "../../common/context/app-context";
//
import MokoH4DH1 from "../devices/moko-h4dh1";
import MokoH4DH2 from "../devices/moko-h4dh2";
import KaipuleEw70 from "../devices/kaipule-ew70";

const registerDeviceParser = (key) => {
    switch (key) {
        case 'MOKO-H4DH1':
            return save(key, new MokoH4DH1());
        case 'MOKO-H4DH2':
            return save(key, new MokoH4DH2());
        case 'KAIPULE-EW70':
            return save(key, new KaipuleEw70());
        default:
            console.log(`un supported parser type ${key}`);
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

