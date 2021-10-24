import React, {useContext, useReducer, useState} from 'react';
import {AppContext} from '../index';
import {Content, Layout, SiteHeader} from './Containers';
import {H} from './Components/H';
import {Link} from './Components/Link';
import {FlexBox} from './Containers/Box';
import {GeoMap} from './Components/Map/GeoMap';
import {Geofence} from './Models/Geofence';
import scss from './app.mod.scss';
import {GeofenceTable} from './Components/GeofenceTable/GeofenceTable';

export type GFStore = Map<string, Geofence>;

type State = {
    geofencies: GFStore;
};

type Action = {type: 'ADD'; payload: Geofence} | {type: 'UPDATE'; payload: Geofence};

const initialState: State = {
    geofencies: new Map(),
};

function reducer(state: State, action: Action) {
    switch (action.type) {
        case 'ADD': {
            const id = action.payload.id;
            state.geofencies.set(id, action.payload);
            return {
                geofencies: state.geofencies,
            };
        }

        case 'UPDATE': {
            const id = action.payload.id;
            state.geofencies.set(id, action.payload);
            return {
                geofencies: state.geofencies,
            };
        }

        default:
            throw new Error();
    }
}

export const App = () => {
    const {site} = useContext(AppContext);
    const [state, dispatch] = useReducer(reducer, initialState);
    const [highlight, setHighlight] = useState<Geofence['id']>();

    const onHoverRow = (gfId) => {
        setHighlight(gfId);
    }

    const onGeofenceCreated = (geofence: any) => {
        dispatch({type: 'ADD', payload: geofence});
    };

    const onSelectColor = (color: string, gfId: Geofence['id']) => {
        const gf = state.geofencies.get(gfId);
        if (!gf) return;
        gf.setColor(color);
        dispatch({type: 'UPDATE', payload: gf});
    };

    const gfs = [...state.geofencies.values()];

    return (
        <Layout>
            <SiteHeader>
                <H tag="h1">{site.name}</H>
                <Link href={`tel:${site.phone}`}>{site.phone}</Link>
            </SiteHeader>
            <Content>
                <div className={scss.contentBox}>
                    <FlexBox>
                        <div className={scss.mapBox}>
                            <GeoMap onGeofenceCreated={onGeofenceCreated} geofencies={gfs} highlight={highlight} onMouseOver={onHoverRow}/>
                        </div>
                        <div className={scss.tableBox}>
                            <GeofenceTable geofencies={gfs} onSelectColor={onSelectColor} onHoverRow={onHoverRow} highlight={highlight}/>
                        </div>
                    </FlexBox>
                </div>

            </Content>
        </Layout>
    );
};
