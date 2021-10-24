import React, {useState} from 'react';
import {Geofence} from '../../Models/Geofence';
import {ColorPicker} from '../ColorPicker/ColorPicker';
import scss from './GeofenceTable.mod.scss';

interface GeofencePropsRow {
    geofence: Geofence;
    onSelectColor: (gfId: Geofence['id'], color: string) => void;
    onHoverRow: (gfId?: Geofence['id']) => void;
    highlight: boolean;
}

export const GeofenceRow = ({geofence, onHoverRow, onSelectColor, highlight}: GeofencePropsRow) => {
    const [name, setName] = useState<string>(geofence.name || '');

    const onMouseEnter = () => onHoverRow(geofence.id);
    const onMouseLeave = () => onHoverRow();

    const onPickColor = (color) => {
        onSelectColor(color, geofence.id);
    };

    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const updateName = () => {
        geofence.setName(name);
    };

    const trClassName = highlight ? scss['tr-highlight'] : scss.tr;

    return (
        <tr className={trClassName} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <td className={scss.td}>
                <input
                    className={scss.nameInput}
                    type="text"
                    value={name}
                    onChange={onChangeName}
                    onBlur={updateName}
                />
            </td>
            <td className={scss.td}>
                <ColorPicker selectedColor={geofence.options.color} onPickColor={onPickColor} />
            </td>
            <td className={scss.td}>{geofence.cretedAt}</td>
        </tr>
    );
};
