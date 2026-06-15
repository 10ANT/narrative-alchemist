"use client";
import { GoogleMap, InfoWindow, LoadScript, Marker, Polyline } from '@react-google-maps/api';
import { useState } from "react";
import { Card, CardBody, Col, Row } from "react-bootstrap";

const containerStyle = {
  width: '100%',
  height: '400px',
}

const polylinePath = [
  { lat: 37.789411, lng: -122.422116 },
  { lat: 37.785757, lng: -122.421333 },
  { lat: 37.789352, lng: -122.415346 },
]

const BasicMap = () => {
  return (
    <Card>
      <CardBody>
        <h4 className="header-title mb-3">Basic Google Map</h4>
        <div
          id="gmaps-basic"
          className="gmaps "
          style={{ position: "relative", overflow: "hidden" }}
        >
          <GoogleMap mapContainerStyle={containerStyle} center={{ lat: -12.043333, lng: -77.028333 }} zoom={14} />
        </div>
      </CardBody>
    </Card>


  );
};

const MarkersGoogleMap = () => {
  const [active, setActive] = useState(false)

  return (
    <Card>
      <CardBody>
        <h4 className="header-title mb-3">Markers Google Map</h4>
        <div
          className="gmaps"
          style={{ position: "relative", overflow: "hidden" }}
        >
          <GoogleMap mapContainerStyle={containerStyle} center={{ lat: 21.569874, lng: 71.5893798 }} zoom={18}>
            <Marker position={{ lat: 21.569874, lng: 71.5893798 }} onClick={() => alert('You clicked in this marker')} />

            <Marker position={{ lat: 21.56969, lng: 71.5893798 }} onClick={() => setActive(true)} />

            {active && (
              <InfoWindow position={{ lat: 21.56969, lng: 71.5893798 }} onCloseClick={() => setActive(false)}>
                <p>Marker with InfoWindow</p>
              </InfoWindow>
            )}
          </GoogleMap>
        </div>
      </CardBody>
    </Card>

  );
};

const StreetViewMap = () => {
  const onMapLoad = (map: google.maps.Map) => {
    const panorama = map.getStreetView()

    panorama.setPosition({ lat: 40.7295174, lng: -73.9986496 })
    panorama.setPov({ heading: 34, pitch: 10 })
    panorama.setZoom(1)
    panorama.setVisible(true)
  }

  return (
    <Card>
      <CardBody>
        <h4 className="header-title mb-3">Street View Panoramas Google Map</h4>
        <div
          className="gmaps"
          style={{ position: "relative", overflow: "hidden" }}
        >
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '400px' }}
            center={{ lat: 40.7295174, lng: -73.9986496 }}
            zoom={14}
            onLoad={onMapLoad}
            options={{
              streetViewControl: false,
              fullscreenControl: true,
              mapTypeControl: false,
            }}
          />
        </div>
      </CardBody>
    </Card>
  );
};

const LightStyledMap = () => {
  const mapStyles = [
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#e9e9e9" }, { lightness: 17 }],
    },
    {
      featureType: "landscape",
      elementType: "geometry",
      stylers: [{ color: "#f5f5f5" }, { lightness: 20 }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.fill",
      stylers: [{ color: "#ffffff" }, { lightness: 17 }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#ffffff" }, { lightness: 29 }, { weight: 0.2 }],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [{ color: "#ffffff" }, { lightness: 18 }],
    },
    {
      featureType: "road.local",
      elementType: "geometry",
      stylers: [{ color: "#ffffff" }, { lightness: 16 }],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [{ color: "#f5f5f5" }, { lightness: 21 }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#dedede" }, { lightness: 21 }],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [{ visibility: "on" }, { color: "#ffffff" }, { lightness: 16 }],
    },
    {
      elementType: "labels.text.fill",
      stylers: [{ saturation: 36 }, { color: "#333333" }, { lightness: 40 }],
    },
    { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#f2f2f2" }, { lightness: 19 }],
    },
    {
      featureType: "administrative",
      elementType: "geometry.fill",
      stylers: [{ color: "#fefefe" }, { lightness: 20 }],
    },
    {
      featureType: "administrative",
      elementType: "geometry.stroke",
      stylers: [{ color: "#fefefe" }, { lightness: 17 }, { weight: 1.2 }],
    },
  ];
  return (
    <Card>
      <CardBody>
        <h4 className="header-title mb-3">Ultra Light with Labels</h4>
        <div
          className="gmaps"
          style={{ position: "relative", overflow: "hidden" }}
        >
          <GoogleMap mapContainerStyle={containerStyle} center={{ lat: -12.043333, lng: -77.028333 }} zoom={14} options={{ styles: mapStyles }} />
        </div>
      </CardBody>
    </Card>
  );
};

const DarkStyledMap = () => {
  const mapStyles = [
    {
      featureType: "all",
      elementType: "labels",
      stylers: [{ visibility: "on" }],
    },
    {
      featureType: "all",
      elementType: "labels.text.fill",
      stylers: [{ saturation: 36 }, { color: "#000000" }, { lightness: 40 }],
    },
    {
      featureType: "all",
      elementType: "labels.text.stroke",
      stylers: [{ visibility: "on" }, { color: "#000000" }, { lightness: 16 }],
    },
    {
      featureType: "all",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "administrative",
      elementType: "geometry.fill",
      stylers: [{ color: "#000000" }, { lightness: 20 }],
    },
    {
      featureType: "administrative",
      elementType: "geometry.stroke",
      stylers: [{ color: "#000000" }, { lightness: 17 }, { weight: 1.2 }],
    },
    {
      featureType: "administrative.country",
      elementType: "labels.text.fill",
      stylers: [{ color: "#e5c163" }],
    },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#c4c4c4" }],
    },
    {
      featureType: "administrative.neighborhood",
      elementType: "labels.text.fill",
      stylers: [{ color: "#e5c163" }],
    },
    {
      featureType: "landscape",
      elementType: "geometry",
      stylers: [{ color: "#000000" }, { lightness: 20 }],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [{ color: "#000000" }, { lightness: 21 }, { visibility: "on" }],
    },
    {
      featureType: "poi.business",
      elementType: "geometry",
      stylers: [{ visibility: "on" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.fill",
      stylers: [{ color: "#e5c163" }, { lightness: "0" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#ffffff" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#e5c163" }],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [{ color: "#000000" }, { lightness: 18 }],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry.fill",
      stylers: [{ color: "#575757" }],
    },
    {
      featureType: "road.arterial",
      elementType: "labels.text.fill",
      stylers: [{ color: "#ffffff" }],
    },
    {
      featureType: "road.arterial",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#2c2c2c" }],
    },
    {
      featureType: "road.local",
      elementType: "geometry",
      stylers: [{ color: "#000000" }, { lightness: 16 }],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [{ color: "#999999" }],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#000000" }, { lightness: 19 }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#000000" }, { lightness: 17 }],
    },
  ];
  return (
    <Card>
      <CardBody>
        <h4 className="header-title mb-3">Dark</h4>
        <div
          className="gmaps"
          style={{ position: "relative", overflow: "hidden", }}
        >
          <GoogleMap mapContainerStyle={containerStyle} center={{ lat: -12.043333, lng: -77.028333 }} zoom={14} options={{ styles: mapStyles }} />
        </div>
      </CardBody>

    </Card>
  );
};

const GoogleMapTypes = () => {
  const mapContainerStyle = {
    width: '100%',
    height: '300px',
  };
  
  return (
    <Card>
      <CardBody>
        <h4 className="header-title mb-3">Google Map Types</h4>
        <div id="gmaps-types" className="gmaps">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={{ lat: 37.787, lng: -122.418 }}
            zoom={14}
          >
            <Polyline
              path={polylinePath}
              options={{
                strokeColor: "#0000FF",
                strokeOpacity: 0.8,
                strokeWeight: 2,
              }}
            />
          </GoogleMap>
        </div>
      </CardBody>
    </Card>
  );
};

const AllGoogleMap = () => {
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!}>
      <div>
        <Row>
          <Col xl={6}>
            <BasicMap />
          </Col>
          <Col xl={6}>
            <MarkersGoogleMap />
          </Col>
        </Row>
        <Row>
          <Col xl={6}>
            <StreetViewMap />
          </Col>
          <Col xl={6}>
            <GoogleMapTypes />
          </Col>
        </Row>
        <Row>
          <Col xl={6}>
            <LightStyledMap />
          </Col>
          <Col xl={6}>
            <DarkStyledMap />
          </Col>
        </Row>
      </div>
    </LoadScript>
  );
};

export default AllGoogleMap;
