import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import Singleplayer from './Singleplayer';
import Multiplayer from './Multiplayer';

const styles = {
    headline: {
        fontSize:     24,
        paddingTop:   16,
        marginBottom: 12,
        fontWeight:   400
    }
};

const TabsExampleSimple = () => (
    <Tabs>
        <Tab label = 'Одиночная игра' >
            <div>
                <Singleplayer />
            </div>
        </Tab>
        <Tab label = 'Мультиплеер' >
            <div>
                <Multiplayer />
            </div>
        </Tab>
        {/* <Tab
            data-route = '/home'
            label = 'onActive'
            onActive = { handleActive }>
            <div>
                <h2 style = { styles.headline }>Tab Three</h2>
                <p>
          This is a third example tab.
                </p>
            </div>
        </Tab> */}
    </Tabs>
);

export default TabsExampleSimple;
