<template>
    <div class="card">
      <div class="box">
        <div class="fck">1112312</div>
      </div>
    </div>
</template>

<style lang="scss" scoped>
$h: 100px;
.card {
  margin: 50px auto;
  width: $h;
  height: $h;
  position: relative;
  transition: all 1.2s ease-in-out 0s;
}

.box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  transition: all 1.2s ease-in-out 0s;
}


.card:hover .box:before {
  width: 100%;
  clip-path: circle(100%);
  // transition: all 1.2s ease-in-out 0s;
}

.card:not(:hover) .box::before {
  animation: 1.2s ease-in-out 0s 1 normal forwards running circle-out;
}

.box::before {
  content: '';
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background: linear-gradient(
    71.18deg,
    rgb(0, 34, 255) -27.32%,
    rgb(0, 34, 255) -16.39%,
    rgb(81, 121, 254) -7.38%,
    rgb(165, 237, 182) 30.59%,
    rgb(250, 232, 90) 46.06%,
    rgb(253, 172, 62) 62.61%,
    rgb(255, 92, 0) 75.82%
  );
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 0;
  transition: all 0.6s ease-in-out 0s;
  clip-path: circle(0% at 0px $h);
}

.fck {
  position: absolute;
  z-index: 1;
  width: calc(100% - 6px);
  height: calc(100% - 6px);
  border-radius: 10px;
  background: #000;
  color: #fff;
}
</style>
