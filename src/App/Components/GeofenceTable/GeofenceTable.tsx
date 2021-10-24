import React from 'react';
import {Geofence} from '../../Models/Geofence';
import {GeofenceRow} from "./GeofenceRow";
import scss from './GeofenceTable.mod.scss';

interface Props {
    geofencies: Geofence[];
    onSelectColor: (color, id) => void;
    onHoverRow: (id) => void;
    highlight?: Geofence['id'];
}

export const GeofenceTable: React.FC<Props> = (props: Props) => {
    return (
        <div style={{padding: '0.5em'}}>
            <table className={scss.geofencesTable}>
                <thead>
                    <tr>
                        <th className={scss.th}>Name</th>
                        <th className={scss.th}>Color</th>
                        <th className={scss.th}>Creation date</th>
                    </tr>
                </thead>
                <tbody>
                    {props.geofencies.map((gf) => {
                        const highlight = props.highlight === gf.id;
                        return (
                            <GeofenceRow geofence={gf} onSelectColor={props.onSelectColor} onHoverRow={props.onHoverRow} key={gf.key} highlight={highlight} />
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
};
