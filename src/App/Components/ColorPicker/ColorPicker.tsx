import React from 'react';
import scss from './ColorPicker.mod.scss';

interface Props {
    selectedColor?: string;
    onPickColor: (color: string) => void;
}

const palette = ['#3388ff', 'orange', 'green', 'yellow'];

export const ColorPicker: React.FC<Props> = (props: Props) => {
    return (
        <div className={scss.colorPicker}>
            {palette.map((color) => {
                const isSelected = props.selectedColor === color;
                return (
                    <div onClick={() => props.onPickColor(color)} className={scss.color} style={{
                        background: color,
                        border: isSelected ? '1px solid black' : 'none'
                    }} key={color}/>
                );
            })}
        </div>
    );
};
