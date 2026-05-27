<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Stringline Mobile — Full app design</title>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet"/>
<link rel="stylesheet" href="mobile-tokens.css?v=4"/>
<style>
body.dc-page { font-family: Geist, -apple-system, system-ui, sans-serif; }
.mb-section-intro h2 { font-family: Geist, system-ui, sans-serif; }
</style>
</head>
<body class="dc-page">
<div id="root"></div>
<template id="__bundler_thumbnail">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
<rect width="200" height="200" fill="#F4ECE0"/>
<g transform="translate(70,40)" fill="#C77B4F" stroke="#3A2A1E" stroke-width="3">
<rect x="0" y="0" width="60" height="110" rx="10" fill="#3A2A1E"/>
<rect x="6" y="14" width="48" height="82" rx="3" fill="#F4ECE0"/>
<circle cx="30" cy="105" r="3" fill="#F4ECE0"/>
</g>
<text x="100" y="180" text-anchor="middle" font-family="ui-sans-serif" font-size="14" font-weight="600" fill="#3A2A1E">Mobile</text>
</svg>
</template>

<script src="https://unpkg.com/react@18.3.1/umd/react.development.js" integrity="sha384-hD6/rw4ppMLGNu3tX5cjIb+uRZ7UkRJ6BPkLpg4hAu/6onKUg4lLsHAs9EBPT82L" crossorigin="anonymous"></script>
<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js" integrity="sha384-u6aeetuaXnQ38mYT8rp6sbXaQe3NL9t+IBXmnYxwkUI2Hw4bsp2Wvmx4yRQF1uAm" crossorigin="anonymous"></script>
<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" integrity="sha384-m08KidiNqLdpJqLq95G/LEi8Qvjl/xUYll3QILypMoQ65QorJ9Lvtp2RXYGBFj1y" crossorigin="anonymous"></script>

<script src="data.js?v=4"></script>
<script type="text/babel" src="design-canvas.jsx?v=2"></script>
<script type="text/babel" src="ios-frame.jsx?v=1"></script>
<script type="text/babel" src="android-frame.jsx?v=1"></script>
<script type="text/babel" src="mobile-primitives.jsx?v=4"></script>
<script type="text/babel" src="mb-screens-1.jsx?v=5"></script>
<script type="text/babel" src="mb-screens-2.jsx?v=5"></script>
<script type="text/babel" src="mb-screens-3.jsx?v=7"></script>
<script type="text/babel" src="mb-screens-4.jsx?v=5"></script>
<script type="text/babel" src="mb-screens-5.jsx?v=4"></script>
<script type="text/babel" src="mb-screens-create.jsx?v=2"></script>
<script type="text/babel" src="mb-screens-bid.jsx?v=2"></script>
<script type="text/babel" src="mb-screens-project-detail.jsx?v=4"></script>
<script type="text/babel" src="mb-screens-crew.jsx?v=2"></script>
<script type="text/babel" src="mb-screens-onboarding.jsx?v=3"></script>
<script type="text/babel" src="mb-screens-owner-ext.jsx?v=2"></script>
<script type="text/babel" src="mb-screens-owner-ext2.jsx?v=2"></script>
<script type="text/babel" src="mb-screens-foreman-ext.jsx?v=3"></script>
<script type="text/babel" src="mb-screens-worker-ext.jsx?v=1"></script>
<script type="text/babel" src="mb-screens-cross-role-ext.jsx?v=1"></script>
<script type="text/babel" src="tweaks-panel.jsx?v=1"></script>
<script type="text/babel" src="mb-app.jsx?v=17"></script>
</body>
</html>
