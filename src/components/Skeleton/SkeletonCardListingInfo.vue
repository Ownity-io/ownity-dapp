<template>
<div class="s-card-info">
  <div class="s-card-info-top">
    <div class="s-card-info-left">
      <div class="s-card-info-left-logo"></div>
      <div class="s-card-info-left-name"></div>
    </div>
    <div class="s-card-info-right">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
  <div class="s-card-name"></div>
  <div class="s-card-subname"></div>
  <div class="s-card-listing-wrapper">
    <div class="s-card-i">
      <div class="s-card-info-left-logo"></div>
      <div class="s-card-listing-info">
        <p></p>
        <p></p>
      </div>
    </div>
    <div class="s-card-btn">

    </div>
  </div>
  <div class="lines"></div>
  <div class="list">
    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
	name: "SkeletonCardListingInfo"
}
</script>

<style scoped>

ul {
    list-style-position: inside;
    display: block;
    -moz-column-count: 2;
    -webkit-column-count: 2;
    column-count: 2;
}

ul li {
    margin-bottom: 24px;
    width: 188px;
    height: 16px;
}

.s-card-info-top {
    display: flex;
    justify-content: space-between;
}

.lines{
    width: 100%;
    height: 48px;
    margin-bottom: 30px;
}

.s-card-i{
    display: flex;
}

.s-card-listing-info p:first-child{
    width: 188px;
    height: 16px;
}
.s-card-listing-info p:last-child{
    width: 188px;
    height: 20px;
    margin-top: 12px;
}

.s-card-info-left-logo{
    border-radius: 8px;
    width: 100%;
}

.s-card-info-right {
    max-width: 176px;
    width: 100%;
    display: flex;
    justify-content: space-between;
}
.s-card-name {
    max-width: 440px;
    width: 100%;
    height: 48px;
    margin-top: 30px;
    margin-bottom: 27px;
}

.s-card-btn {
    width: 184px;
    height: 48px;
}

.s-card-info-left {
    display: flex;
    align-items: center;
}
.s-card-info-left-logo,
.s-card-info-right div {
    height: 48px;
    width: 48px;
}
.s-card-info-left-name {
    width: 188px;
    height: 32px;
}
.s-card-info-left-logo {
    margin-right: 16px;
}
.s-card-subname {
    width: 188px;
    height: 16px;
}
ul li,
.s-card-btn,
.s-card-listing-info p:last-child,
.s-card-listing-info p:first-child,
.s-card-subname,
.s-card-name,
.s-card-info-left-name,
.s-card-info-left-logo,
.lines,
.s-card-info-right div{
    background: #EEEFF3;
    background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
    background-size: 500% 350%;
    background-position: center;
    -webkit-animation: 2.5s shine linear infinite;
    animation: 2.5s shine linear infinite;
    border-radius: 8px;
}

.s-card-listing-wrapper {
    padding: 28px 24px;
    border: 1px solid #DFE2EA;
    border-radius: 8px;
    margin-top: 47px;
    margin-bottom: 37px;
    display: flex;
    justify-content: space-between;
}

@-webkit-keyframes shine {
    to {
        background-position-x: -500%;
    }
}

@keyframes shine {
    to {
        background-position-x: -400%;
    }
}
</style>