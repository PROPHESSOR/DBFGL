import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
// import Slider from 'material-ui/Slider';

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
                <h2 style = { styles.headline }>Одиночная игра</h2>
                <p>
                    This is an example tab.
                </p>
                <p>
                    You can put any sort of HTML or react component in here. It even keeps the component state!
                </p>
                {/* <Slider name = 'slider0' defaultValue = { 0.5 } /> */}
            </div>
        </Tab>
        <Tab label = 'Мультиплеер' >
            <div>
                <h2 style = { styles.headline }>Мультиплеер</h2>
                <p>
                    This is another example tab.
                </p>
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
