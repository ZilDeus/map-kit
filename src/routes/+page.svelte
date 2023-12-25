<script>
  import { onMount, onDestroy } from "svelte";
  import mapboxgl from "mapbox-gl";
  import "../../node_modules/mapbox-gl/dist/mapbox-gl.css";
  import Nav from "$lib/Nav.svelte";
  import Input from "$lib/Input.svelte";
  import Button from "$lib/Button.svelte";
  import SideMenu from "$lib/SideMenu.svelte";
  import SignUpForm from "$lib/SignUpForm.svelte";
  import BANNER from "$res/banner.jpg";
  import MAP from "$res/mapbox-icon.png";

  /** @type {{userId: string , userName: string, devices: []}} */
  export let data;
  /** @type {any} */
  let map;
  /** @type {HTMLDivElement} */
  let mapContainer;
  let global = { lng: 0, lat: 0, zoom: 0 };

  function updateData() {
    global.zoom = map.getZoom();
    global.lng = map.getCenter().lng;
    global.lat = map.getCenter().lat;
  }
  /** @param {GeolocationPositionError} err */
  function Error(err) {
    if (err.code == 1) {
      alert("Error: Access is denied!");
    } else if (err.code == 2) {
      alert("Error: Position is unavailable!");
    }
  }
  /** @param {GeolocationPosition} position */
  function SetupMap(position) {
    mapboxgl.setRTLTextPlugin(
      "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.0/mapbox-gl-rtl-text.js",
      () => {},
    );
    let lng = 0,
      lat = 0;
    lng = position?.coords.longitude;
    lat = position?.coords.latitude;
    map = new mapboxgl.Map({
      container: mapContainer,
      accessToken:
        "pk.eyJ1IjoiemlsZGV1cyIsImEiOiJjbHFma2lmcnIwM29mMnFvMGY3MmtzcG9pIn0.D_gb8OmsImn5G7ld_dPtJg",
      style: "mapbox://styles/zildeus/clqgisfaz00jx01nw87ix3xbw",
      center: [lng, lat],
      zoom: 15.0,
      attributionControl: false,
    });
    global.lng = lng;
    global.lat = lat;
    global.zoom = 15;
    const geojson = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: ["44.4004", "33.3364"],
          },
          properties: {
            title: "Mapbox",
            description: "Washington, D.C.",
          },
        },
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [-122.414, 37.776],
          },
          properties: {
            title: "Mapbox",
            description: "San Francisco, California",
          },
        },
      ],
    };
    // add markers to map
    for (const d of data.devices) {
      // create a HTML element for each feature
      const el = document.createElement("div");
      el.style.backgroundImage = `url(${MAP})`;
      el.style.backgroundSize = `cover`;
      el.style.width = "50px";
      el.style.height = `50px`;
      el.style.borderRadius = `50%`;

      // make a marker for each feature and add it to the map
      new mapboxgl.Marker(el).setLngLat([d.longitude, d.latitude]).addTo(map);
    }
  }
  onMount(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        SetupMap(position);
      },
      (err) => {
        alert("location unavailable");
        Error(err);
      },
      {},
    );
  });

  //onDestroy(() => {
  //  map.remove();
  //});

  //<div>
  //  <div class="sidebar">
  //    Longitude: {global.lng.toFixed(4)} | Latitude: {global.lat.toFixed(4)} | Zoom:
  //    {global.zoom.toFixed(2)}
  //  </div>
  //  <div class="map-wrap">
  //    <div class="map" bind:this={mapContainer} />
  //  </div>
  //</div>
</script>

<div class="h-full flex flex-col">
  <Nav />
  {#if data.userId}
    <div class="flex flex-row my-0 grow">
      <SideMenu>
        <form action="?/addDevice" method="post">
          <Input label="Device" name="device" id="device" />
          <Button type="submit">ADD DEVICE</Button>
        </form>
      </SideMenu>
      <div bind:this={mapContainer} class="grow">
        <div class="marker" />
      </div>
    </div>
  {:else}
    <div class="flex flex-row my-0 grow">
      <SideMenu>
        <SignUpForm class="p-1 flex flex-col" />
      </SideMenu>
      <div class="flex grow bg-gray-200 items-center justify-center">
        <img src={BANNER} alt="" />
      </div>
    </div>
  {/if}
</div>
