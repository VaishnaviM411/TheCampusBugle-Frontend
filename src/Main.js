import * as React from 'react';
import Col1 from './Col1';
import Col2 from './Col2';
import Col3 from './Col3';
class Main extends React.Component
{
    render(){
        return(
            <>
                <div class="main-panel">
                    <Col1/>
                    <Col2/>
                    <Col3/>
                </div>
            </>
        )
    }
}

export default Main;