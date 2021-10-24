import {v4} from 'uuid';
import {LatLngExpression, Polygon} from 'leaflet';
import {TimeFormatterFactory} from "../Util/TimeFormatter";

const dateTimeFormatter = TimeFormatterFactory();

export class Geofence {
    readonly type = 'Feature';
    geometry: LatLngExpression[][];
    options: Polygon['options'] & {name?: string} = {};
    id: string = v4();
    #creationDate: Date = new Date();
    name: string = '';
    revision: number = 0;

    constructor(geo: Polygon) {
        this.geometry = geo.getLatLngs() as LatLngExpression[][]; //we definitely know this
        this.options = geo.options;
    }

    get key() {
        return this.id + '-rev-' + this.revision.toString();
    }

    setColor(color) {
        this.options.color = color;
        this.revision++;
    }

    setName(name){
        this.name = name;
        this.revision++;
    }

    get cretedAt(){
        return dateTimeFormatter(this.#creationDate)
    }
}
