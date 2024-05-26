
import React from 'react';
import { ILayout } from '../../common/types/layout';

const LayoutComponent: React.FC<ILayout> = ({ children }: ILayout) => {
    return (
        <div>
            {children}
        </div>
    );
};

export default LayoutComponent;
