/* =============================================================
   EnRouteAR : places.js
   Predefined campus locations for the destination selector.
   Each entry requires: name (string), latitude, longitude.
   ============================================================= */

const places = [
    { name: 'Administrative Department',   latitude: 21.38541,           longitude: 79.30562,          category: 'admin',    code: 'ADM',  desc: 'Central Administration, Dean Office & Student Affairs' },
    { name: 'Architecture Department',     latitude: 21.38529,           longitude: 79.30656,          category: 'academic', code: 'ARCH', desc: 'Department of Architecture & Planning Studios' },
    { name: 'Canteen',                     latitude: 21.38641,           longitude: 79.30685,          category: 'facility', code: 'FOOD', desc: 'Central Student Dining, Snacks & Refreshment Zone' },
    { name: 'Civil Department',            latitude: 21.38615,           longitude: 79.30640,          category: 'academic', code: 'CIVIL',desc: 'Civil Engineering Block, Survey Labs & Materials Wing' },
    { name: 'Computer Tech. Department',   latitude: 21.38589858431855,  longitude: 79.30617602325364, category: 'academic', code: 'CT',   desc: 'Computer Technology, AI & Core Computing Labs' },
    { name: 'Electronics Department',      latitude: 21.38589858431855,  longitude: 79.30617602325364, category: 'academic', code: 'ECE',  desc: 'Electronics & Communication Laboratories' },
    { name: 'Gym/Stadium',                 latitude: 21.386459963614396, longitude: 79.30433992812651, category: 'facility', code: 'GYM',  desc: 'Indoor Sports Complex, Gymnasium & Athletics Ground' },
    { name: 'Information Tech. Department',latitude: 21.38589858431855, longitude: 79.30617602325364, category: 'academic', code: 'IT',   desc: 'Information Technology & Software Systems Wing' },
    { name: 'Jamuna Boys Hostel',          latitude: 21.38681,           longitude: 79.30335,          category: 'hostel',   code: 'JBH',  desc: 'Senior Boys Residential Block & Recreation Commons' },
    { name: 'Kaveri Girls Hostel',         latitude: 21.38440,           longitude: 79.30420,          category: 'hostel',   code: 'KGH',  desc: 'Girls Residential Campus with 24/7 Security' },
    { name: 'Library',                     latitude: 21.38584,           longitude: 79.30689,          category: 'facility', code: 'LIB',  desc: 'Central Knowledge Center, Digital Resources & Study Hall' },
    { name: 'Mechanical Department',       latitude: 21.38493,           longitude: 79.30606,          category: 'academic', code: 'MECH', desc: 'Mechanical Engineering, Thermal & CAD/CAM Labs' },
    { name: 'Triveni Boys Hostel',         latitude: 21.38836,           longitude: 79.30370,          category: 'hostel',   code: 'TBH',  desc: 'Junior Boys Residential Hall' },
    { name: 'Work Shop',                   latitude: 21.38486,           longitude: 79.30620,          category: 'facility', code: 'WSP',  desc: 'Central Engineering Fabrication & Machining Workshop' },
    { name: 'Location 20°18\'32.5"N 78°51\'00.5"E', latitude: 20.309028, longitude: 78.850139,      category: 'test',     code: 'GPS',  desc: 'Calibrated Geodetic Reference Point' },
];