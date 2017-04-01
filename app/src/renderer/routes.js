export default [
  {
    path: '/',
    name: 'landing-page',
    component: require('components/LandingPageView')
  },
  {
    path: '/studio',
    name: 'studio-page',
    component: require('components/StudioPageView')
  },
  {
    path: '/studio-two',
    name: 'studio-page-two',
    component: require('components/StudioTwo/StudioTwo')
  },
  {
    path: '*',
    redirect: '/'
  }
]
