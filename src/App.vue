<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>&nbsp;|&nbsp;
      <router-link to="/add-topic">Add Topic</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
/* Basic Reset & Body Styling */
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* Milder, more elegant background gradient */
  background: linear-gradient(135deg, #a1c4fd 10%, #c2e9fb 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

#app {
  font-family: 'Open Sans', sans-serif; /* Switched to Open Sans for better readability */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333333; /* Darker text for better contrast on lighter glass */
  max-width: 900px;
  margin: 50px auto;
  padding: 25px; /* Slightly more padding for breathing room */
  background: rgba(255, 255, 255, 0.3); /* Lighter frosted glass */
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5); /* More visible border for definition */
  box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.15); /* Softer, less intense shadow */
  backdrop-filter: blur(12px); /* Slightly more blur for a smoother look */
  -webkit-backdrop-filter: blur(12px);
  text-align: center;
}

#nav {
  padding: 15px; /* Reduced padding slightly */
  margin-bottom: 25px; /* Increased space below nav */
  background: rgba(255, 255, 255, 0.4); /* Slightly more opaque nav glass */
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.1); /* Even softer shadow for nav */
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  gap: 25px; /* Increased space between links */
}

#nav a {
  font-weight: 600;
  color: #555555; /* A sophisticated dark grey for links */
  text-decoration: none;
  transition: color 0.3s ease, transform 0.3s ease;
  padding: 10px 20px; /* Increased padding for easier clicking */
  border-radius: 10px; /* Slightly more rounded corners for links */
  position: relative;
}

#nav a::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 5px; /* Lift the underline slightly from the bottom */
  left: 50%;
  transform: translateX(-50%);
  background-color: #74a4bc; /* A serene, dusty blue for the underline */
  transition: width 0.3s ease;
}

#nav a:hover {
  color: #333333; /* Darker on hover for better visibility */
  transform: translateY(-3px); /* Slightly more pronounced lift */
}

#nav a:hover::after {
  width: calc(100% - 20px); /* Adjust width to fit new padding */
}

#nav a.router-link-exact-active {
  color: #3f68a8; /* A calming, deeper blue for active links */
  background: rgba(255, 255, 255, 0.3); /* Active background matches overall app glass */
  box-shadow: 0 2px 8px 0 rgba(63, 104, 168, 0.3); /* Subtle glow from active color */
  transform: translateY(-3px);
}

#nav a.router-link-exact-active::after {
  width: calc(100% - 20px);
  background-color: #3f68a8; /* Match active link color */
}

/* Importing a more readable Google Font */
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');
</style>