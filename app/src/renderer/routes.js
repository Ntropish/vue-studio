export default [
  {
    path: '/',
    name: 'landing-page',
    component: require('components/LandingPageView')
  },
  {
    path: '/studio',
    name: 'studio-page',
    component: require('components/Studio')
  },
  {
    path: '*',
    redirect: '/'
  }
]
