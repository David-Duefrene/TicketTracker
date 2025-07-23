import React, { useState } from 'react';

interface TabbedComponentProps {
    tabs: [string, React.ReactNode][];
}

const TabbedComponent: React.FC<TabbedComponentProps> = ({ tabs }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <div>
            <div style={{ display: 'flex', borderBottom: '1px solid #ccc', marginBottom: 16 }}>
                {tabs.map(([label], idx) => (
                    <button
                        key={label}
                        style={{
                            padding: '8px 16px',
                            border: 'none',
                            borderBottom: selectedIndex === idx ? '2px solid #007bff' : '2px solid transparent',
                            background: 'none',
                            cursor: 'pointer',
                            fontWeight: selectedIndex === idx ? 'bold' : 'normal'
                        }}
                        onClick={() => setSelectedIndex(idx)}
                    >
                        {label}
                    </button>
                ))}
            </div>
            <div>
                {tabs[selectedIndex][1]}
            </div>
        </div>
    );
};

export default TabbedComponent;
