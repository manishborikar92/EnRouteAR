AFRAME.registerComponent('gps-path', {
    schema: {
        coordinates: { type: 'array' },
        color: { default: '##0100ff' },
    },

    init: function () {
        const { coordinates, color } = this.data;

        // Create the main path entity
        const path = document.createElement('a-entity');
        path.setAttribute('gps-path', { coordinates, color });

        // Create a smooth curve between path coordinates
        const curve = this.createSmoothCurve(coordinates);
        
        // Create a line with the smooth curve
        const line = document.createElement('a-curve');
        line.setAttribute('curvedLine', { points: curve });

        // Create a line component to visualize the path
        const lineEntity = document.createElement('a-entity');
        lineEntity.setAttribute('line', { path: `curve(${curve.join(', ')})`, color, opacity: 0.8, lineWidth: 10 });

        // Append the line to the path entity
        path.appendChild(lineEntity);
        this.el.appendChild(path);
    },

    createSmoothCurve: function (coordinates) {
        // Function to create a smooth curve between path coordinates
        // You may need to adjust this based on your specific use case
        const curve = [];
        for (let i = 0; i < coordinates.length - 1; i++) {
            const point1 = coordinates[i];
            const point2 = coordinates[i + 1];

            // Calculate midpoints
            const midPointX = (point1.longitude + point2.longitude) / 2;
            const midPointY = (point1.latitude + point2.latitude) / 2;

            // Add the midpoints to the curve
            curve.push({ x: midPointX, y: midPointY });
        }
        return curve;
    },
});
