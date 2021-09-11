import React from "react";
import ContentLoader from "react-content-loader";

function LoadingItem() {
    return (
        <ContentLoader
            speed={2}
            width={300}
            height={583}
            viewBox="0 0 300 583"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <circle cx="150" cy="150" r="150" />
            <rect x="0" y="318" rx="15" ry="15" width="300" height="30" />
            <rect x="0" y="363" rx="7" ry="7" width="300" height="15" />
            <rect x="0" y="388" rx="7" ry="7" width="300" height="15" />
            <rect x="0" y="413" rx="7" ry="7" width="300" height="15" />
            <rect x="0" y="448" rx="17" ry="17" width="300" height="34" />
            <rect x="0" y="492" rx="17" ry="17" width="300" height="34" />
            <rect x="134" y="537" rx="23" ry="23" width="166" height="46" />
            <rect x="0" y="544" rx="16" ry="16" width="47" height="32" />
        </ContentLoader>
    );
}

export default LoadingItem;