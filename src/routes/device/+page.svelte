<script>
  import { onMount, onDestroy } from "svelte";
  import mapboxgl from "mapbox-gl";
  import "../../../node_modules/mapbox-gl/dist/mapbox-gl.css";
  import Nav from "$lib/Nav.svelte";
  import Icon from "$lib/Icon.svelte";
  /** @type {{deviceId: string}} */
  export let data;
  let deviceId = data.deviceId ? data.deviceId : "";
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
  /** 
      @param {GeolocationPositionError} err 
  */
  function Error(err) {
    if (err.code == 1) {
      alert("Error: Access is denied!");
    } else if (err.code == 2) {
      alert("Error: Position is unavailable!");
    }
  }
  /** 
    @param {GeolocationPosition} position 
  */
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
    map.on("move", () => {
      updateData();
    });
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
</script>

<div class="flex flex-col h-full">
  <form method="POST" action="?/switch">
    <Nav isUser={false} />
  </form>
  <div
    class="flex flex-row bg-blue-700 text-base absolute right-0 top-12 my-1 items-center p-3 rounded-lg z-10"
  >
    <label for="device-id" class="text-white">device ID :</label>
    <input
      name="device-id"
      class="bg-transparent border border-white text-white focus:outline-none mx-1 p-1 w-20"
      bind:value={deviceId}
    />
  </div>
  <form
    method="POST"
    action={`?/set&device-id=${deviceId}&longitude=${global.lng}&latitude=${global.lat}`}
  >
    <div
      class="flex flex-row text-base absolute bottom-0 my-1 items-center p-3 rounded-lg h-10 justify-center w-full z-10"
    >
      <button class="bg-blue-700 rounded-lg p-2" type="submit"
        >set location</button
      >
    </div>
  </form>
  <div
    class="flex items-center justify-center grow h-auto"
    bind:this={mapContainer}
  >
    <Icon name="device" class="z-10" size={3} />
  </div>
</div>
