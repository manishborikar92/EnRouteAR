AFRAME.registerComponent('gps-arrow', {
    schema: {
        latitude: { type: 'number' },
        longitude: { type: 'number' },
        color: { default: '#0100ff' },
    },

    init: function () {
        const { latitude, longitude, color } = this.data;

        // Create the main arrow entity
        const arrow = document.createElement('a-entity');
        arrow.setAttribute('geometry', { primitive: 'cone', radius: 0.2, height: 0.5 });
        arrow.setAttribute('material', { color });

        // Calculate the rotation angle based on GPS coordinates
        const rotation = this.calculateRotation(latitude, longitude);
        arrow.setAttribute('rotation', `0 ${rotation} 0`);

        // Create arrowhead
        const arrowhead = document.createElement('a-entity');
        arrowhead.setAttribute('geometry', { primitive: 'cone', radius: 0.3, height: 0.2 });
        arrowhead.setAttribute('material', { color });
        arrowhead.setAttribute('position', '0 0.2 0');
        arrow.appendChild(arrowhead);

        // Create arrow tail
        const tail = document.createElement('a-entity');
        tail.setAttribute('geometry', { primitive: 'cylinder', radius: 0.1, height: 0.2 });
        tail.setAttribute('material', { color });
        tail.setAttribute('position', '0 -0.1 0');
        arrow.appendChild(tail);

        this.el.appendChild(arrow);
    },

    calculateRotation: function (destLatitude, destLongitude) {
        // Calculate the rotation angle based on the difference in GPS coordinates
        // You may need to adjust this calculation based on your specific use case
        const deltaLongitude = destLongitude - this.data.longitude;
        const deltaLatitude = destLatitude - this.data.latitude;

        // Calculate the rotation angle (result is in degrees)
        const rotation = (Math.atan2(deltaLongitude, deltaLatitude) * 180) / Math.PI;

        return rotation;
    },
});
