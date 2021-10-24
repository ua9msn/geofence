import React, {useRef} from 'react';
import {FeatureGroup, MapContainer, Polygon, TileLayer, Tooltip} from 'react-leaflet';
import {EditControl} from './EditControl';
import {Geofence} from '../../Models/Geofence';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw-src.css';

interface Props {
    onGeofenceCreated: (geofence: Geofence) => void;
    geofencies: Geofence[];
    highlight?: Geofence['id'];
    onMouseOver: (gfId?: Geofence['id']) => void;
}

function Fence({gf, highlight, onMouseOver}) {
    const ref = useRef(null);

    const pathOptions = {
        ...gf.options,
        color: highlight ? 'red' : gf.options.color
    }

    return <Polygon ref={ref} positions={gf.geometry} pathOptions={pathOptions} eventHandlers={{
        mouseover: () => onMouseOver(gf.id),
        mouseout: () => onMouseOver(),
    }}>
        <Tooltip>
            <span>Name: {gf.name || 'no name'}</span><br/>
            <span>Created at: {gf.cretedAt}</span><br />
        </Tooltip>
    </Polygon>;
}

export const GeoMap: React.FC<Props> = (props: Props) => {
    const onCreated = (args: any) => {
        //TODO: type guards
        const gf = new Geofence(args.layer);
        props.onGeofenceCreated(gf);
    };

    const onDeleted = (args: any) => {
        console.log(args);
    };

    return (
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true} style={{height: '100%', width: '100%', zIndex: 1}}>
            <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            <FeatureGroup>
                <EditControl position="topright" onCreated={onCreated} onDeleted={onDeleted} draw={{
                    rectangle: false,
                    polyline: false,
                    circle: false,
                    circlemarker: false,
                    marker: false,
                }}/>
                {props.geofencies.map((gf) => {
                        const highlight = gf.id === props.highlight
                        return (
                            <Fence gf={gf} key={gf.key} highlight={highlight} onMouseOver={props.onMouseOver} />
                        )
                    }
                )}
            </FeatureGroup>
        </MapContainer>
    );
};
